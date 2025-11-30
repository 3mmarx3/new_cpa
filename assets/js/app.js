let index = 1;

function updateAllFlexHeights() {
  const flexContainers = document.querySelectorAll('.flex');
  flexContainers.forEach(flex => {
    const hasVisibleChildren = Array.from(flex.children).some(child => child.offsetParent !== null);
    flex.style.height = hasVisibleChildren ? '75vh' : 'auto';
  });
}

function showQuestion() {
  document.querySelectorAll(".question-box").forEach(q => q.style.display = "none");
  const q = document.getElementById("q" + index);
  if (!q) return;
  q.style.display = "block";
  q.style.opacity = 0;
  setTimeout(() => { q.style.opacity = 1; }, 50);

  const counter = document.getElementById("counter");
  if (counter) counter.innerText = index + "/4";

  const progressBar = document.getElementById("progressBar");
  if (progressBar) progressBar.style.width = (index / 4) * 100 + "%";

  updateAllFlexHeights();
}

function nextQuestion() {
  if (index < 4) {
    index++;
    showQuestion();
  }
}

function prevQuestion() {
  if (index > 1) {
    index--;
    showQuestion();
  }
}

function finishQuiz() {
  document.querySelectorAll(".question-box").forEach(q => q.style.display = "none");
  updateAllFlexHeights();

  const loading1 = document.getElementById("loading1");
  const loading2 = document.getElementById("loading2");
  const final = document.getElementById("final");
  const finalText1 = document.getElementById("finalText1");
  const finalText2 = document.getElementById("finalText2");
  const ctaBtn = document.getElementById("ctaBtn");

  if (loading1) loading1.style.display = "block";

  setTimeout(() => {
    if (loading1) loading1.style.display = "none";
    if (loading2) loading2.style.display = "block";

    setTimeout(() => {
      if (loading2) loading2.style.display = "none";
      if (final) final.style.display = "block";

      if (finalText1) finalText1.style.display = "block";

      setTimeout(() => {
        if (finalText1) finalText1.style.display = "none";
        if (finalText2) finalText2.style.display = "block";
        if (ctaBtn) ctaBtn.style.display = "inline-block";
        updateAllFlexHeights();
      }, 2000);

    }, 2000);

  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});
