//reference link: https://github.com/yusufsefasezer/javascript-hangman-game

var alphabet = [],
    words = [],
    selectedWord = "",
    numberOfTries = 0,
    countOfFound = 0,
    totalRights = 7,
    results = null,
    statusArea = null,
    numberOfRounds = 1 // ! Counting number of Rounds (5 Rds = 1 Game)
    score = 0,
    rdScore = 100;

function restartGame() {
    document.getElementById("score").innerHTML = ""
        
    numberOfRounds = 0
    score = 0
    restart()
}


function restart() {
    numberOfRounds++
    if ( numberOfRounds < 6) {

        document.getElementById("test").innerHTML = ""

        round = document.getElementById("round")
        round.innerHTML = `Round ${numberOfRounds} / 5`

        currScore = document.getElementById("score")
        currScore.innerHTML = `<b>Current Score : ${score} / 500</b>`
        
        man = document.getElementById("status");
        man.innerHTML = `<img src="img/status_0.gif" alt="Current Status" id="current-status" />`;
        input = document.getElementById("inputs");
        input.innerHTML = '';
        button = document.getElementById("buttons");
        button.innerHTML = '';
        results = document.getElementById("results");
        results.innerHTML = '';

        
        alphabet = [],
        words = [],
        selectedWord = "";
        numberOfTries = 0,
        countOfFound = 0,
        totalRights = 7,
        results = null,
        statusArea = null,
        rdScore = 100;
    
        position = ''
        // selectedWord = ''
    
        initialize()
    } 
    else {
        document.getElementById("score").innerHTML = "Game Over!"
        results.innerHTML = "Congratulations !!! <br>";
        if (score >= 300) {
            document.getElementById("results").innerHTML = `Wow! You're good! <br> <b>Score : ${score} / 500</b>`
        } else {
            document.getElementById("results").innerHTML = `Not bad! <br> <b>Score : ${score} / 500</b>`
        }
        
        var gameBtn = document.getElementById("game-btns")
        gameBtn.style.display = "block"
        var restartBtn = document.getElementById("restart-btn")
        restartBtn.disabled = false 
        var exitBtn = document.getElementById("update")
        exitBtn.disabled = false
        
        
        
        return;
    }
}

function initialize() {
    round = document.getElementById("round")
    round.innerHTML = `<h3>Round ${numberOfRounds} / 5</h3>`

    currScore = document.getElementById("score")
    currScore.innerHTML = `<b>Current Score : ${score} / 500</b>`

    results = document.getElementById("results");
    statusArea = document.getElementById("current-status");
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    words = ["altcoin", "bitcoin", "blockchain", "coinbase", "coldwallet", "defi", "ethereum", "gas", "halving", "hash", "hotwallet", "marketcap", "mining", "publickey", "privatekey", "stablecoin"];



    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();
    

    for (var i = 0; i < selectedWord.length; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.readOnly = true;
        document.getElementById("inputs").appendChild(input);
    }

    for (var i = 0; i < alphabet.length; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = alphabet[i];
        btn.onclick = check;
        document.getElementById("buttons").appendChild(btn);
    }
}

var points = 0
function summary(){
    points = score
    var x = document.getElementById("wrapper");
    x.style.display = "none";

    var y = document.getElementById("wrapper2");
    y.style.display = "block";

    points = score
    var btns = document.getElementsByClassName("learn");
    for (btn of btns){
        btn.removeAttribute("disabled")
    };
}



function check() {
    var currentValue = this.innerHTML, notFound = true;

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] == currentValue) {
            document.getElementsByTagName("input")[i].value = currentValue;
            notFound = false;
            countOfFound++;
        }
    }

    if (countOfFound == selectedWord.length) {
        var btns = document.getElementsByTagName("button");

            for (var i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }

        document.getElementById("inputs").innerHTML = ""
        document.getElementById("inputs").innerHTML = `<p>Answer : <span class="fw-bold">${selectedWord}</span></p>`
        score += rdScore
        
        if (numberOfRounds < 5) {
            document.getElementById("test").innerHTML = "Yay! Next word is coming..."
        } else {
            document.getElementById("test").innerHTML = "Woohoo!"
        }

        setTimeout(restart, 1500)
        // setTimeout(restart, 100) // ! For Testing

        
        return;
    }


    this.disabled = true;

    if (notFound) {
        numberOfTries++;
        statusArea.src = "img/status_" + numberOfTries + ".gif";

        // results.innerHTML = "Try it " + numberOfTries + " times.";
        // results.innerHTML += "<br />";
        results.innerHTML = "You have " + (totalRights - numberOfTries) + " tries remaining.";
        rdScore -= 10

        if (numberOfTries == totalRights) {
            var btns = document.getElementsByTagName("button");

            for (var i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }

            document.getElementById("inputs").innerHTML = ""
            document.getElementById("inputs").innerHTML = `<p>Answer : <span class="fw-bold">${selectedWord}</span></p>`
            score += rdScore

            document.getElementById("test").innerHTML = "Oh no! Try again..."
            setTimeout(restart, 1500)

        }


    }

}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// window.onload = initialize;

function startGame() {
    document.getElementById('instruction').style.display = "none"

    document.getElementById('wrapper').style.display = "block"

    initialize();
}