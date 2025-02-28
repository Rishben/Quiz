function startquiz() {
  console.log("clicked");
  window.location.href = "quiz.html";
}

const startButton = document.getElementById('startQuiz');
startButton.addEventListener('click', startquiz);