let index = 1;
const get = (id) => document.getElementById(id);
const query = (s) => document.querySelectorAll(s);

const updateHeight = () => query('.flex').forEach(flex => 
  flex.style.height = [...flex.children].some(c => c.offsetParent) ? '75vh' : 'auto'
);

const showQuestion = () => {
  query(".question-box").forEach(q => q.style.display = "none");
  const q = get("q" + index);
  if (q) {
    q.style.display = "block";
    setTimeout(() => q.style.opacity = 1, 50);
    get("counter").innerText = `${index}/4`;
    get("progressBar").style.width = `${index * 25}%`;
  }
  updateHeight();
};

const nextQuestion = () => index < 4 && (++index, showQuestion());
const prevQuestion = () => index > 1 && (--index, showQuestion());

const finishQuiz = async () => {
  query(".question-box").forEach(q => q.style.display = "none");
  updateHeight();

  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  const playStep = async (id) => {
    get(id).style.display = "block";
    await delay(2000);
    get(id).style.display = "none";
  };

  await playStep("loading1");
  await playStep("loading2");

  ["final", "finalText2"].forEach(id => get(id).style.display = "block");
  get("ctaBtn").style.display = "inline-block";
  updateHeight();
};

document.addEventListener("DOMContentLoaded", showQuestion);