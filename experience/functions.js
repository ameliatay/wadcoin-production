// ------------------------------------- General Functions (Used in > 1 html page) -----------------------------------------------------

// Reformats the date in the format required to obtain crypto prices
function addZero(input) {
    if (input.length == 1) {
        input = "0" + input
    }
    return input 
}

// Returns current dateTime and date in a list format
// Expected output: "2021-10-11 03:10:00" and "2021-10-11" and "11/10/2021"
// Axios output uses GMT, Sg is GMT + 8, so for timings pertaining to Sg's timing, have to not minus
function getFormattedDate(num) {
    var currentDate = new Date(); 
    
    var currentMonth = (currentDate.getMonth() + 1).toString();
    currentMonth = addZero(currentMonth);
    
    var currentDay = currentDate.getDate().toString()
    currentDay = addZero(currentDay);
    
    var currentHours= (currentDate.getHours()-num);

    // Condition to check if current time is between 12AM and 8AM sg time, to change a negative time to 24HRS
    if (currentHours < 0) {
        currentHours = 24 + currentHours
        currentHours.toString()
    }
    
    // If current hours is like 8AM, change 8 to 08
    currentHours = addZero(currentHours);
    currentHours += ":";

    var currentMinutes = currentDate.getMinutes().toString()
    currentMinutes = addZero(currentMinutes);
    currentMinutes += ":"
    
    var dateTime = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay + " " + currentHours + currentMinutes + "00";
    var date = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
    var date2 = currentDay + "/" + currentMonth + "/" + currentDate.getFullYear()

    return [dateTime, date, date2]
}
 
// Formats numbers to add commas as thousands seperators
function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Reduces number of decimals without rounding the value
// E.g., 1.667 => 1.66 instead of 1.67 vai toFixed(2)
// If decimal input > number of decimal in value, original value will be returned
function limitDecimals(value, decimals) {
    const parts = value.toString().split('.')
  
    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join('.'))
    } else {
      return Number(parts[0]);
    }
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}

function moveRocketGeneral(varNum) {
    
    var moon = document.getElementById("moon");
    var rocket = document.getElementById("rocket");
    
    let posLeft = getOffset(rocket).left;
    var originalPosLeft = getOffset(rocket).left;
    var transMoonPosLeft = getOffset(moon).left - 150

    // Check if browser width is too narrow or if the rocket has not returned to earth
    if (transMoonPosLeft < posLeft || this.rocket == false) {
        return
    }

    // Prevents user from spamming
    this.rocket = false
    let id = null;

    clearInterval(id);

    id = setInterval(frame, 5);

    function frame() {
        if (posLeft > transMoonPosLeft) {
            clearInterval(id);

            this.rocket = false
            setTimeout(() => {
                rocket.style.left = originalPosLeft - 80 - varNum + "px";
                this.rocket = true;
            }, 500)
        }
        else {
            posLeft += 2; 
            rocket.style.left = posLeft + "px"; 
        }
    }
}

// -------------------------------------- Functions meant for current_holdings page -----------------------------------------------------
function getCurrent(userCurrent) {

    // Initialise variables to populate overall table
    var ttlInvested = 0;
    var ttlValue = 0;
    var ttlChange = 0;
    var ttlPChange = 0;

    // Attempted to do via appendChild instead of coding innerHTML but the alignemnt gets affected
    var output = "<table class = 'table table-hover table-bordered round-table-bdr'>"
    output += "<tr class = 'table-secondary'>" +
        "<th>Cryptocurrency</th>" + 
        "<th>Quantity</th>" +
        "<th>Average Cost Price<br>per coin</th>" +
        "<th>Total Cost Price</th>" +
        "<th>Market Price<br>per coin</th>" +
        "<th>Current Total Value</th>" +
        "<th>Change</th>" +
        "<th>% Change</th>" +
        "<th>Buy / Sell</th>" +
        "</tr>"

    var tableCurrent = document.getElementById("table-current");
    tableCurrent.innerHTML = output;

    // Looping through each holding the user currently has
    for (let key of Object.keys(userCurrent)) {

        // Obtain the current key's crypto symbol
        var cryptoSymbol = userCurrent[key].name

        //Put it in the url to obtain the latest price
        // changeable parameters: symbol (ETH), currency (SGD)
        var url = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=" + cryptoSymbol + "&market=SGD&interval=1min&apikey=" + config.ALPHA_VANTAGE_KEY 
        
        // Asynch request to obtain latest price
        axios.get(url)
        .then (response => { 

            output = "";

            // Obtain closePrice from alphavantage
            var dateTime = getFormattedDate(8)[0];
            if (dateTime in response.data["Time Series Crypto (1min)"]) {
                var closePrice = parseFloat(response.data["Time Series Crypto (1min)"][dateTime]["4. close"]);
            } else {
                var lastKey = Object.keys(response.data["Time Series Crypto (1min)"]).pop()
                var closePrice = parseFloat(response.data["Time Series Crypto (1min)"][lastKey]["4. close"]);
            }
            // var closePrice = parseFloat(response.data["Time Series Crypto (1min)"][dateTime]["4. close"]);
            var roundedLatestPrice = Math.round(closePrice * 100) / 100;

            // Assigning varibale name to data from firestore
            var currName = userCurrent[key].name;
            var currQty = parseFloat(userCurrent[key].quantity);
            var currAverageCostPrice = parseFloat(userCurrent[key].averageCostPrice);
            var currTotalCostPrice = parseFloat(userCurrent[key].totalCostPrice);

            // Calculate Current Total Value, Change & Percentage Change

            var currTotalValue = currQty * closePrice
            var change = currTotalValue - currTotalCostPrice;
            var pChange = 100 / currTotalCostPrice * change;

            // Creating data for each row
            output += "<tr>"
            output += "<td>" + currName + "</td>" +
                        "<td>" + limitDecimals(currQty,6) + "</td>" +
                        "<td>" + "$" + formatNumber(limitDecimals(currAverageCostPrice,2)) + "</td>" +
                        "<td>" + "$" + formatNumber(limitDecimals(currTotalCostPrice,2)) + "</td>" +
                        "<td>" + "$" + formatNumber(limitDecimals(roundedLatestPrice,2)) + "</td>" +
                        "<td>" + "$" + formatNumber(limitDecimals(currTotalValue,2)) + "</td>" +
                        "<td>" + "$" + formatNumber(limitDecimals(change,2)) + "</td>" +
                        "<td>" + formatNumber(limitDecimals(pChange,2)) + "</td>" +
                        "<td><a href= 'buy.html' id = 'buy-page-btn' class='btn btn-success me-2 active' aria-pressed='true'>Buy</a>" +
                            "<a href= 'sell.html' id = 'sell-page-btn' class='btn btn-danger me-2 active' aria-pressed='true'>Sell</a></td>"
            output += "</tr>"

            // Adding the data to the table 
            var tableCurrent = document.getElementById("table-current");
            // Slice is necessary as JS automatically adds </table> to the end of the innerHTML
            tableCurrent.innerHTML = tableCurrent.innerHTML.slice(0,-8) + output;

            // To populate overall holdings table
            // Total Invested
            ttlInvested += currTotalCostPrice
            document.getElementById("ttlInvested").innerText = "$" + formatNumber(limitDecimals(ttlInvested,2))

            // Total Value
            ttlValue += currQty * closePrice;
            document.getElementById("ttlValue").innerText = "$" + formatNumber(limitDecimals(ttlValue,2))

            // Total Change
            ttlChange += change
            document.getElementById("ttlChange").innerText = "$" + formatNumber(limitDecimals(ttlChange,2))

            // Total PChange
            ttlPChange = formatNumber(limitDecimals((100 / ttlInvested * ttlChange),2));
            document.getElementById("ttlPChange").innerText = ttlPChange;
        })
        
        .catch (error => {
        })
    }
    // Adding the details to the current table
    var tableCurrent = document.getElementById("table-current");
    tableCurrent.innerHTML += "</table>";
}

function getHistory(userHistory) {

    // Attempted to do via appendChild instead of coding innerHTML but the alignemnt gets affected

    // Generating History Table
    var output = "<table class = 'table table-hover table-bordered round-table-bdr'>"
    output += "<tr class =  'table-secondary'>" +
        "<th>Name</th>" + 
        "<th>Quantity</th>" +
        "<th>Average Cost Price<br>per coin</th>" +
        "<th>Date Sold</th>" +
        "<th>Sold Price<br>per coin</th>" +
        "<th>Profit</th>" +
        "<th>% Profit</th>" +
        "</tr>"

    var tableHistory = document.getElementById("table-history");
    tableHistory.innerHTML = output;

    for (let key of Object.keys(userHistory)) {

        // Initialising variables for user's history data
        var currName = userHistory[key].name;
        var currQty = limitDecimals(userHistory[key].quantity,6);
        var currAverageCostPrice = formatNumber(limitDecimals(userHistory[key].averageCostPrice,2));
        var currDateSold = userHistory[key].dateSold;
        var currSoldPrice = formatNumber(limitDecimals(userHistory[key].soldPrice,2));
        var currProfit = formatNumber(limitDecimals(userHistory[key].profit,2));
        var currPProfit = formatNumber(limitDecimals(userHistory[key].pProfit,2));
        
        // Creating data for each row
        output = "";
        output += "<tr>"
        output +=   "<td>" + currName + "</td>" +
                    "<td>" + currQty + "</td>" +
                    "<td>" + "$" + currAverageCostPrice + "</td>" +
                    "<td>" + currDateSold + "</td>" +
                    "<td>" + "$" + currSoldPrice + "</td>" +
                    "<td>" + "$" + currProfit + "</td>" +
                    "<td>" + currPProfit + "</td>"
        output += "</tr>"

        // Adding the data to the table 
        var tableHistory = document.getElementById("table-history");

        // Slice is necessary as JS automatically adds </table> to the end of the innerHTML
        tableHistory.innerHTML = tableHistory.innerHTML.slice(0,-8) + output;
    }
}
// -------------------------------------- Function meant for buy & sell page -----------------------------------------------------
function infoPopUp() {
    var list = document.createElement('ol');
    var textList = [
        "Open: It is the starting point of a defined period of trading.",
        "High: It is the point where the value of the asset is highest in that period of trading.",
        "Low: It is the point where the value of the asset is lowest in that period of trading.",
        "Close: It is the ending of a defined period of trading.",
        "Volume: It is the total amount of that asset was traded in that time period.",
    ]
    for (i = 0; i < textList.length; i ++) {
        var item = document.createElement("li");
        item.innerHTML = textList[i];
        list.appendChild(item);
    }
    swal({
        title: "Definitions",
        icon: "info",
        content: list,
        closeOnClickOutside: false,
    })

    
}

function viewDetails() {
    if (document.getElementById("error")) {
        document.getElementById("error").remove();
    }
    if (document.getElementById("info-msg")) {
        document.getElementById("info-msg").remove()
    }

    document.getElementById("viewDetails").disabled = true;
    
    document.getElementById("buy-info").innerText = "";
    var cryptoSymbol = document.getElementById("select-crypto").value;
    var buyInfo = document.getElementById("buy-info");
    
    // If user has not selected a cryptocurrency before viewing details
    if (cryptoSymbol == "") {
        var newNode = document.createElement("p")
        newNode.id = "view-error"
        newNode.setAttribute("class", "mt-5 text-center")
        var textNode = document.createTextNode("Please pick a cryptocurrency before clicking 'View Details' button");
        newNode.appendChild(textNode);
        buyInfo.appendChild(newNode);
        document.getElementById("viewDetails").disabled = false;
    }
    else {
        // Obtain Intra Day Data
        var url = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=" + cryptoSymbol + "&market=SGD&interval=1min&apikey=" + config.ALPHA_VANTAGE_KEY 
        axios.get(url)
        .then (response => { 
            var currDateTime = getFormattedDate(0)[0];
            var dateTime = getFormattedDate(8)[0];
            var dataObj = {}

            if (dateTime in response.data["Time Series Crypto (1min)"]) {
                dataObj = response.data["Time Series Crypto (1min)"][dateTime];
            } else {
                var lastKey = Object.keys(response.data["Time Series Crypto (1min)"]).pop()
                dataObj = response.data["Time Series Crypto (1min)"][lastKey];
            }

            // Obtaining data from Alpha Vantage
            var cryptoName = response.data["Meta Data"]["3. Digital Currency Name"]
            var openPrice = formatNumber(limitDecimals(parseFloat(dataObj["1. open"]),2));
            var highPrice = formatNumber(limitDecimals(parseFloat(dataObj["2. high"]),2));
            var lowPrice = formatNumber(limitDecimals(parseFloat(dataObj["3. low"]),2));
            var closePrice = formatNumber(limitDecimals(parseFloat(dataObj["4. close"]),2));
            var volume = dataObj["5. volume"];
            
            // Creating list for creating info list
            var list1 = [currDateTime, cryptoName, openPrice, highPrice, lowPrice, closePrice, volume]
            var list2 = ["Last refreshed: ", "Cryptocurrency Name: ", 
                        "Current minute's Open: $", 
                        "Current minute's High: $", 
                        "Current minute's Low: $", 
                        "Current minute's Close: $", 
                        "Current minute's Volume: "]
            var listNode = document.createElement("ol");
            listNode.id = "view-list";
            
            // Generating info list
            for (let i = 0; i < list1.length; i++) {
                
                // For Crypto Name add the symbol behind
                // Expected output: Bitcoin (BTC)
                if (i == 1) {
                    var liNode = document.createElement("li");
                    var liText = document.createTextNode(list2[i] + list1 [i] + " (" + cryptoSymbol + ")");
                }
                else {
                    var liNode = document.createElement("li");
                    var liText = document.createTextNode(list2[i] + list1 [i])
                }
                liNode.appendChild(liText);
                listNode.appendChild(liNode);
                listNode.setAttribute('data-aos', 'zoom-in-right')
            }
            buyInfo.appendChild(listNode);
        })
        .catch(error => {
        })

        // Obtain daily data
        var url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + cryptoSymbol + "&market=CNY&apikey=G49PABFF6VA4KEW5"
        axios.get(url)
        .then(response =>{
            var date = getFormattedDate(0)[1];
            var todayVol = formatNumber(limitDecimals(parseFloat(response.data["Time Series (Digital Currency Daily)"][date]["5. volume"]),2));
            var listNode = document.getElementById("view-list");
            var liNode = document.createElement("li");
            var liText = document.createTextNode("Today's Volume: " + todayVol)
            liNode.appendChild(liText);
            listNode.appendChild(liNode);
            document.getElementById("viewDetails").disabled = false;
        })
        .catch(error => {
        })
    }
}