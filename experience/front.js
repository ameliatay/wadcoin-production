// reference link: https://github.com/sarthakdixit/JavaScript/tree/master/Stock%20Forex%20Data

var api = "hI8AXAWD4A61ME4UT"
var dps = [];
var company = null;
var symbol = null;
var chart = null;
var columns = ["Date", "Open", "High", "Low", "Close", "Volume"];
var data1 = []


function introPopUp(){
  const list = document.createElement('p');
  //var listItem1 = document.createElement('li');
  list.innerHTML = 'This interactive game is an avenue for you to put your crypto knowledge to the test. You can monitor live crypto prices which helps you decide the best time to buy/sell . <br> Have fun!🚀🌕';
  //list.appendChild(listItem1);
  swal({
    title: "Welcome to the Paper Trading Simulation!",
    icon: "info",
    content: list,
    closeOnClickOutside: false,
  }) 
}

//popup
function popUp(){
  const list = document.createElement('ol');
  var listItem1 = document.createElement('li');
  var listItem2 = document.createElement('li');
  var listItem3 = document.createElement('li');
  listItem1.innerHTML = 'Select your coin of choice';
  list.appendChild(listItem1);
  listItem2.innerHTML = 'Buy cryptocurrency to add them into your holdings.';
  list.appendChild(listItem2);
  listItem3.innerHTML = "Sell them to earn profits and challenge points"
  list.appendChild(listItem3);
  swal({
    title: "How to play?",
    icon: "info",
    content: list,
    closeOnClickOutside: false,
  })
}

//graph
function getting_data(){
    
  if(company !== null){

    $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+ symbol + "&market=SGD&apikey=" + config.ALPHA_VANTAGE_KEY )
    .done(function(data){
      var date = data["Time Series (Digital Currency Daily)"]
      let a = 30; 
      let b = 8;
      for(var d in date){
          var r = d.split("-");
          if(a-- > 0){
              var value = date[d];
              dps.unshift({x: new Date(parseInt(r[0]), parseInt(r[1])-1, parseInt(r[2])), y: parseFloat(value["1a. open (SGD)"])});
              if(b-- > 0){
                  let c = [d, value["1a. open (SGD)"], value["2a. high (SGD)"], value["3a. low (SGD)"], value["4a. close (SGD)"], value["5. volume"], value["6. market cap (SGD)"]];
                  data1.push(c);
          }
        }else{
          break;
        }
      }
      writeMore();
      graph();
      
      drawTable();
      
      document.getElementById("loading_container").style.display = "none";
      document.getElementById("chartContainer").disabled = false;

    })
    .fail(function(textStatus, error){
      alert(textStatus+" "+error+"\nReload the page");
    })
  }
}
 
function graph(){
  chart = new CanvasJS.Chart("chartContainer", {
    title:{
      text: company
    },
    animationEnabled: true,
    theme: "light2",
    axisY:{
      title: "Open Prices",
      labelFormatter: function (e) {
        return "$" + CanvasJS.formatNumber(e.value, "#,#00.##");
        },
      includeZero: false
    },
    axisX:{
      title: "Date",
      valueFormatString: "DD-MMM"
    },
    data: [{        
      type: "line",
          indexLabelFontSize: 16,
      dataPoints: dps
    }]
  });

  for (let i=0; i<dps.length; i++){
    dps[i].y = Number(dps[i].y.toFixed(3))
  }
  
  chart.options.data[0].dataPoints = dps;
  chart.render();
  var list = document.getElementsByClassName("coins")
  for (const item of list) {
    item.removeAttribute('disabled')
  }

}

function getData(value){
  if(chart !== null){
    chart.destroy();
    document.getElementById("table_container").innerHTML = ""
  }
  data1 = [];
  dps = [];
  company = value
  let r = company.split("(");
  symbol = r[1].substring(0, r[1].length-1);
  document.getElementById("loading_container").style.display = "block";
  document.getElementById("chartContainer").disabled = true;
  document.getElementById("row-about").disabled = true;
  var list = document.getElementsByClassName("coins")
  for (const item of list) {
    item.setAttribute('disabled', 'disabled')
  }
  getting_data();
}

function drawTable(){
  var table_container = document.getElementById("table_container");
  var para = document.createElement("h4");
  var cell = document.createTextNode("Historical Data");
  para.setAttribute("class", "d-flex justify-content-center mt-4")
  para.appendChild(cell);
  table_container.appendChild(para);
  
  var div = document.createElement("div");
  div.id = "table_container_prices"
  div.setAttribute("style", "margin-top:16px;")

  var table = document.createElement("table");
  table.id = "table_prices"
  table.setAttribute("class", "table table-hover table-bordered round-table-bdr text-center");

  var row = document.createElement("tr");

  for(let i=0;i<columns.length;i++){
    var col = document.createElement("th");
    col.scope = "col";
    cell = document.createTextNode(columns[i]);
    col.appendChild(cell);
    row.appendChild(col);
  }
  table.appendChild(row);
  
  for(let i=1;i<8;i++){
    row = document.createElement("tr");
    for(let j=0;j<6;j++){
      col = document.createElement("td");
      if (!data1[i][j].includes("-")){
        data1[i][j] = Number(data1[i][j]);
        data1[i][j] = data1[i][j].toFixed(3);
      }
      if(j > 0 && j < 5){
        data1[i][j] = "$" + data1[i][j];
      }
      cell = document.createTextNode(data1[i][j]);
      col.appendChild(cell);
      row.appendChild(col);
    }
    table.appendChild(row);
  }
  div.appendChild(table)
  table_container.appendChild(div);
}

function writeMore(){
    if (document.getElementById("row-about") !== null){
        document.getElementById("row-about").innerHTML = "";
    }

    if (company == "Bitcoin(BTC)") {
      htmlText = "<p>Visit the <a href = '../wadbank/bitcoin.html'>WAD Bank</a> to learn more about " + company +"!</p>"
    }
    else if (company == "Ethereum(ETH)") {
      htmlText = "<p>Visit the <a href = '../wadbank/ethereum.html'>WAD Bank</a> to learn more about " + company +"!</p>"
    }
    else if (company == "Litecoin(LTC)") {
      htmlText = "<p>Visit the <a href = '../wadbank/litecoin.html'>WAD Bank</a> to learn more about " + company +"!</p>"
    }
    else if (company == "Ripple(XRP)") {
      htmlText = "<p>Visit the <a href = '../wadbank/ripple.html'>WAD Bank</a> to learn more about " + company +"!</p>"
    }
    else {
      htmlText = "<p>Visit the <a href = '../wadbank/cardano.html'>WAD Bank</a> to learn more about " + company +"!</p>"
    }

    var spaceContainer = document.getElementById("row-about");
    var para = document.createElement("p");
    para.innerHTML= htmlText
    spaceContainer.appendChild(para)
}