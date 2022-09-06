// reference link: https://www.sitepoint.com/simple-javascript-quiz/

function buildQuiz(){
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label class="d-block mb-1">
            <input class="ans" type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // <div class="slide">
      // add this question and its answers to the output
      output.push(
        `<div class="slide container-fluid"> 
          <div class="question fs-4 fw-bold">Q${questionNumber+1}\) ${currentQuestion.question} </div>
          <div class="answers mb-2 text-start d-inline-block"> ${answers.join("")} </div>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

var points = 0
function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    const allAnsOpt = document.getElementsByClassName('ans')
    for (var ansOpt of allAnsOpt) {
      ansOpt.setAttribute('disabled', "")
    }

    // if answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `<b>Score: ${numCorrect} out of ${myQuestions.length}<b> <br>`;

  if (numCorrect == 5) {
    resultsContainer.innerHTML += `Wow! You're great! `;
    points = 150
  } else if (numCorrect == 4 || numCorrect == 3) {
    resultsContainer.innerHTML += `Nice! Keep learning you will get better! `;
    points = 100
  } else {
    resultsContainer.innerHTML += `Ah...you can do better! Check out our Learn Section to be a Crypto Master! `;
    points = 50
  }

  // button to exit
  resultsContainer.innerHTML += `<br> <button class="btn btn-success" onclick="summary()">Exit</button>`
}
  
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}
  
function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}
  
// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.getElementsByClassName("slide");
var currentSlide = 0;
  


// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


function start() {
  var a = document.getElementById('wrapper')
  a.style.display = "block"

  var x = document.getElementById('instruction')
  x.style.display = "none"

  buildQuiz()
  showSlide(currentSlide)

}

function summary() {
  var a = document.getElementById('wrapper')
  a.style.display = "none"

  var b = document.getElementById('summary')
  b.style.display = "block"

  document.getElementById('summaryHeader').classList.remove('d-none')
}

