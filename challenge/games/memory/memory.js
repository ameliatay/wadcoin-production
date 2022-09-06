// reference link:https://github.com/taniarascia/memory

// document.addEventListener('DOMContentLoaded', () => {
  var pts = 0
  function start() {
    //card options
    
    var a = document.getElementById("instruction")
    a.style.display = "none"
  
    var x = document.getElementById('wrapper')
    x.style.display = "block"
  
    function timeToString(time) {
      let diffInHrs = time / 3600000;
      let hh = Math.floor(diffInHrs);
    
      let diffInMin = (diffInHrs - hh) * 60;
      let mm = Math.floor(diffInMin);
    
      let diffInSec = (diffInMin - mm) * 60;
      let ss = Math.floor(diffInSec);
    
      let diffInMs = (diffInSec - ss) * 100;
      let ms = Math.floor(diffInMs);
    
      let formattedMM = mm.toString().padStart(2, "0");
      let formattedSS = ss.toString().padStart(2, "0");
      let formattedMS = ms.toString().padStart(2, "0");
    
      return `${formattedMM}:${formattedSS}:${formattedMS}`;
    }
    
    // Declare variables to use in our functions below
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
  
    function print(txt) {
      document.getElementById("display").innerHTML = txt;
    }
  
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    

  
    cardArray.sort(() => 0.5 - Math.random())
  
    // const grid = document.querySelector('.grid')
    const grid = document.getElementById('grid')
    const resultDisplay = document.getElementById('result')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = 0
    // let cardsWon = 10 // ! For Testing
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('class', 'cd')
        card.setAttribute('src', 'img/blank.png')
        card.setAttribute('data-id', i)
        
  
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
  
        
      }
      resultDisplay.innerHTML = `Score: ${cardsWon} / ${cardArray.length/2}`; 
    }
  
  
  
    //check for matches
    function checkForMatch() {
      // const cards = document.querySelectorAll('img')
      const cards = document.getElementsByClassName('cd')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
  
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
  
        cards[optionOneId].setAttribute('src', 'img/white.png')
        cards[optionTwoId].setAttribute('src', 'img/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon++
      } else {
        
        cards[optionOneId].setAttribute('src', 'img/blank.png')
        cards[optionTwoId].setAttribute('src', 'img/blank.png')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.innerHTML = `Score: ${cardsWon} / ${cardArray.length/2}`; 
  
      if  (cardsWon === cardArray.length/2) {
        clearInterval(timerInterval);
  
        if (elapsedTime < 30000) {
          pts = 200
        } else if (elapsedTime < 40000) {
          pts = 150
        } else if (elapsedTime < 60000) {
          pts = 100
        } else {
          pts = 50
        }
  
        
        resultDisplay.innerHTML = 'Congratulations! You found them all!'
        resultDisplay.innerHTML += `<br> <b>You scored ${pts} </b>`
        // resultDisplay.innerHTML += `<button type="button" class="btn btn-primary" onclick="summary()">Exit</button>`;
        var exitBtn = document.getElementById('update')
        exitBtn.style.display = "block";
        exitBtn.disbled = false;
      }
    }
  
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)

  
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {

  
        setTimeout(checkForMatch, 300)
      }
    }
  
    createBoard()
  }
  
  
  
  
  var points = 0
  function summary(){
    points = pts
    var x = document.getElementById("wrapper");
    x.style.display = "none";
  
    var y = document.getElementById("wrapper2");
    y.style.display = "block";
  
  }
  