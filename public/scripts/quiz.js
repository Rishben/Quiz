const question = document.querySelector("#question");
const questionOptions = document.querySelector(".questionOptions");
const message = document.querySelector("#message");
let currentIndex = 0;
let quizData = [];
let score = 0;
let totalQuestions = 10;
async function fetchQuizQuestions() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();
    quizData = data.results;
    displayQuestion(currentIndex);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
}
function displayQuestion(index) {
  if (index >= quizData.length) {
    message.textContent = "Quiz Completed!";
    document.getElementById("nextQuestion").style.display = "none"; 
    document.getElementById("checkScoreBtn").style.display = "block";
    return;
  }

  const ques = quizData[index].question;
  let options = [...quizData[index].incorrect_answers, quizData[index].correct_answer];

  // Shuffle options
  options = options.sort(() => Math.random() - 0.5);

  question.innerHTML = ques;
  question.classList.add("questionStyle");

  questionOptions.innerHTML = "";

  options.forEach((option, idx) => {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "answer";
    radioBtn.id = `option${idx}`;
    radioBtn.value = option;
    radioBtn.classList.add("radio-btn");

    const label = document.createElement("label");
    label.htmlFor = `option${idx}`;
    label.innerHTML = option;
    label.classList.add("radio-label");

    questionOptions.appendChild(radioBtn);
    questionOptions.appendChild(label);
    questionOptions.appendChild(document.createElement("br"));
  });

  message.textContent = "";
}
function checkAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    message.textContent = "Please select an option!";
    message.style.color = "red";
    return;
  }

  const correctAnswer = quizData[currentIndex].correct_answer;
  if (selected.value === correctAnswer) {
    message.textContent = "✅ Correct!";
    message.style.color = "green";
  } else {
    message.textContent = `❌ Incorrect! Correct answer: ${correctAnswer}`;
    message.style.color = "red";
  }
  const radioButtons = document.querySelectorAll("input[name='answer']");
  radioButtons.forEach(button => button.disabled = true);
}
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  const messageDiv = document.getElementById("message");
  const correctAnswer = quizData[currentIndex].correct_answer;

  if (selectedOption) {
    if (selectedOption.value === correctAnswer) {
      score++; // Increment score if the answer is correct
    }
    currentIndex++; // Only increase index if an answer is selected

    if (currentIndex < quizData.length) {
      displayQuestion(currentIndex); // Display the next question
    }

    if (currentIndex === quizData.length) {
      localStorage.setItem('score', score);
      document.getElementById("checkScoreBtn").style.display = "block"; // Show the "Check Score" button
      document.getElementById("nextQuestion").style.display = "none"; // Hide the "Next" button
    }
  } else {
    messageDiv.textContent = "Please submit your answer before proceeding.";
    messageDiv.style.color = "red";
  }
}

function showScorePage() {
  window.open('scorePage.html', '_blank');
}

// 🟢 Load First Question
fetchQuizQuestions();
