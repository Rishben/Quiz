const score = localStorage.getItem('score');
      
if (score) {
  document.getElementById('scoreDisplay').textContent = `Your Score: ${score} / 10`;
} else {
  document.getElementById('scoreDisplay').textContent = "No score found.";
}

function Home(){
    window.location.href = "index.html";
}