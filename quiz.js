const quizData = [
  { question: "What is 2+2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
  
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length);  // Track selected answers

// Function to display a question
function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  // Display question text
 questionContainer.innerHTML =`<p class="question-text">${quizData[currentQuestion].question}</p>`;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Display options as radio buttons
  quizData[currentQuestion].options.forEach((option, index) => {
    optionsContainer.innerHTML += `
      <label class="ans">
        <input type="radio" name="option" value="${option}" onclick="selectAnswer('${option}')"> ${option}
      </label><br>
    `;
  });
}

// Handle answer selection
function selectAnswer(selectedOption) {
  userAnswers[currentQuestion] = selectedOption;
}

// Navigate through questions
function navigate(direction) {
  currentQuestion += direction;
  if (currentQuestion < 0) currentQuestion = 0;
  if (currentQuestion >= quizData.length) currentQuestion = quizData.length - 1;
  displayQuestion();
}

// Submit the quiz
function submitQuiz() {
  let score = 0;

  // Calculate the score
  userAnswers.forEach((answer, index) => {
    if (answer === quizData[index].answer) {
      score++;
    }
  });

  // Display result
  const resultContainer = document.getElementById("result-container");
  const resultText = getFeedback(score);
  resultContainer.innerHTML = `
    <h3>Your Score: ${score} / ${quizData.length}</h3>
    <p>${resultText}</p>
  `;
  resultContainer.style.display = "block";
  document.getElementById("submit-button").style.display = "none";
  document.getElementById("navigation").style.display = "none";
}

// Get feedback based on score
function getFeedback(score) {
  if (score === quizData.length) {
    return "Excellent!";
  } else if (score >= quizData.length * 0.7) {
    return "Good!";
  } else {
    return "Needs Improvement.";
  }
}


displayQuestion();