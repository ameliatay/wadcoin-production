
var dps = []

var dataPoints = {
    "scenario": {
        "2019-07-01": { "price": "10700" },
        "2019-08-01": { "price": "10090" },
        "2019-09-01": { "price": "9600"  },
        "2019-10-01": { "price": "8300"  },
        "2019-11-01": { "price": "9100"  },
        "2019-12-01": { "price": "7500"  },
        "2020-01-01": { "price": "7100"  },
        "2020-02-01": { "price": "9300"  },
        "2020-03-01": { "price": "8500"  },
        "2020-04-01": { "price": "6400"  },
        "2020-05-01": { "price": "8600"  },
        "2020-06-01": { "price": "9600"  }
    },
    "1": {
        "2019-07-01": { "price": "10700" },
        "2019-08-01": { "price": "10090" },
        "2019-09-01": { "price": "9600"  },
        "2019-10-01": { "price": "8300"  },
        "2019-11-01": { "price": "9100"  },
        "2019-12-01": { "price": "7500"  },
        "2020-01-01": { "price": "7100"  }

    },
    "2": {
        "2020-02-01": { "price": "9300"  }
    },
    "3" : {
        "2020-03-01": { "price": "8500"  }
    }, 
    "4" : {
        "2020-04-01": { "price": "6400"  }
    }, 
    "5" : {
        "2020-05-01": { "price": "8600"  }
    }, 
    "6" : {
        "2020-06-01": { "price": "9600"  }
    }



}

var headlines = {
    "1" : {
        "January 2020" : [
            "CipherTrace claims that its research unit has uncovered that every one of the US’s top 10 commercial banks have unregistered cryptocurrency business.",
            "Wells Fargo analyst, Mike Mayo, said “We are living in the Golden Decade of Banks and Technology”.",
            "The price of Graphics Processor Units (GPUs) are soaring as demand increase."
        ]
    },
    "2" : {
        "February 2020" : [
            "Coinbase say Bitcoin is becoming closer to Digital Gold.",
            "Cases of COVID-19 are increasing rapidly.",
            "Warren Buffett got his first BTC as a gift. ",
            "Recent rise in BTC price attracts miner worldwide."
        ]
    },
    "3" : {
        "March 2020" : [
            "COVID-19 became a full scale pandemic.",
            "Stock market crashed.",
            "Russia’s central bank seeks to ban crypto.",
            "Canada tightens its crypto regulations.",
            "Retail demand for Bitcoin ETF increases.",
            "Robinhood users demands for compensation after service outages."
        ]
    },
    "4" : {
        "April 2020" : [
            "Blockchain firms have stepped up their global relief efforts.",
            "Data suggest that some Americans are buying crypto with stimulus check.",
            "Unemployement rate increases.",
            "Experts predict that BTC and crypto economy will rise."
        ]
    },
    "5" : {
        "May 2020" : [
            "Retail investors moving to Altcoins.",
            "China reports a shortage of electrical supply resulting in shutting of mining operations."
        ]
    },
    "6" : {
        "June 2020" : ["The challenge has ended"]
    }
}

var count = 0
var wallet = 1000
var currencyWallet = 0


// function restart() {
//     var dps = []
//     var count = 0
//     var wallet = 1000
//     var currencyWallet = 0

//     document.getElementById("restart").style.display = "none"

//     getting_data()
// }


function graph(){
    chart = new CanvasJS.Chart("chartContainer", {
        title:{
        text: `Scenario`
        },
        animationEnabled: false,
        theme: "dark2",
        axisY:{
        // title: "Open Prices",
        labelFormatter: function (e) {
            return "$" + CanvasJS.formatNumber(e.value, "#,#00.##");
            },
        includeZero: false
        },
        axisX:{
        // title: "Date",
        valueFormatString: "DD-MM-YYYY",
        intervalType: "month",
        interval: 1
        },
        data: [{        
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: dps
        }]
    });
    chart.options.data[0].dataPoints = dps;
    chart.render();


    
    }

function getting_data(){
    document.getElementById('instruction').style.display = 'none';
    count++;

    var date = dataPoints[count]

    let a = 7; 
    for(var d in date){
        if(a-- > 0){
            var value = date[d];
            dps.unshift({x: new Date(d), y: parseInt(value["price"])});

        }else{
            break;
        }
    }

    graph();

    /* ==== Print Scenario ==== */

    document.getElementById("headlines").innerHTML = "<p>This challenge will last from Jan 2020 to June 2020 (5 Rounds)</p>" + "<p>Whenever you think you are ready to go to the next month, click [Next Month]</p>" + "<p class='fw-bold text-success'>Goal: Try to reach $1500 at the end</p>";

    var newsDisplay = '<ul>'

    var news = headlines[count]
    
    for(var n in news){
        
        
        var month = n
        var headers = news[n]
        document.getElementById("headlines").innerHTML += "Now: " + month;


        for (h in headers){
            newsDisplay += '<li>' + headers[h] + '</li>'
        }

        newsDisplay += '</ul>'

        document.getElementById("headlines").innerHTML += newsDisplay;

        document.getElementById("nextPage").style.display = "block"

        document.getElementById("transaction").style.display = "block"

        // Stop the game when count reaches 6
        if (count == 6) {
            // disable nextpage and transaction 
            document.getElementById("nextPage").style.display = "none"
            document.getElementById("transaction").style.display = "none"

            // wrap up. display final amount and if he completed the challenge
            // sell off all BTC convert to cash and check if it reach goal (1.5k)
            if (currencyWallet >= 0) {
                var currentY = chart.data[0].get("dataPoints")[0].y;
                var end = Number((currentY * currencyWallet).toFixed(3));
                
                wallet += end

                // if completed the challenge then exit and redirect to challenge page
                if (wallet >= 1500) {
                    document.getElementById("headlines").innerHTML = `Congratulations! You completed the challenge!`
                    document.getElementById("complete").style.display = "block"
                    // document.getElementById("restart").style.display = "block"

                } else {
                    // if challenge not completed give option to restart or go back
                    document.getElementById("headlines").innerHTML = `Uh oh! You did not hit the goal. &#128546`
                    document.getElementById("complete").style.display = "block"
                    // document.getElementById("restart").style.display = "block"
                }
            } else {
                break
            }

        }

    }

    document.getElementById("challenge").className = ""
    document.getElementById('wallet').innerHTML = "Cash : $" + wallet.toFixed(2);
    document.getElementById('currencyWallet').innerHTML = "BTC : " + currencyWallet.toFixed(3)

}




function buy() {
    document.getElementById('status').innerHTML= ""
    var currentY = chart.data[0].get("dataPoints")[0].y;
 
    var amt = document.getElementById('amount').value; // in terms of dollars

    var a = Number((amt / currentY).toFixed(3)) 


    if (amt > wallet) {
        document.getElementById('status').innerHTML = `<p class="text-danger">Exceeded amount in your wallet!</p>`
    } else {
        wallet -= amt
        currencyWallet += a
    

        document.getElementById('wallet').innerHTML = "Remaining Amount : $" + wallet.toFixed(2)
        document.getElementById('currencyWallet').innerHTML = "BTC : " + currencyWallet.toFixed(3)
        document.getElementById('status').innerHTML = `<p class="text-success d-inline">You have bought ${a} BTC!</p>`
        document.getElementById('amount').value = ""
    }

}

function sell() {
    document.getElementById('status').innerHTML= ""
    var currentY = chart.data[0].get("dataPoints")[0].y;
    var amt = document.getElementById('amount').value; // in terms of BTC
    var a = Number((amt * currentY).toFixed(3));

    if (currencyWallet <= 0) {
        document.getElementById('status').innerHTML = `<p class="text-danger">You do not have any BTC to sell!</p>`
    } else if (currencyWallet < amt ) {
        document.getElementById('status').innerHTML = `<p class="text-danger">You're selling more BTC than you have!</p>`
    } else {
        currencyWallet -= amt
        wallet += a

        document.getElementById('wallet').innerHTML = "Remaining Amount : $" + wallet.toFixed(2)
        document.getElementById('currencyWallet').innerHTML = "BTC : " + currencyWallet.toFixed(3)
        document.getElementById('status').innerHTML = `<p class="text-success">You have sold ${amt} BTC!</p>`
        document.getElementById('amount').value = ""
    }

}

var points = 0
function summary(){
    var x = document.getElementById("wrapper");
    x.style.display = "none";

    var y = document.getElementById("summary");
    y.style.display = "block";

    // Calculate score
    var finalAmt = wallet - 1000
    if (finalAmt >= 500 && finalAmt < 600) {
        
        points = 50
    } else if (finalAmt >= 600 && finalAmt < 700 ) {
     
        points = 100
    } else if (finalAmt >= 700 && finalAmt < 800 ) {
        
        points = 250
    } else if (finalAmt >= 800 && finalAmt < 900 ) {
  
        points = 500
    } else if (finalAmt >= 900 ) {

        points = 1000
    }

}