const STORAGE_KEY = "firewatch-quiz-result-v1";
const screens = [...document.querySelectorAll(".screen")];
const $ = (id) => document.getElementById(id);
let questionIndex = 0;
let score = 0;
let answered = false;

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  $("appShell").dataset.screen = id;
  const phases = {
    startScreen: "BRIEFING",
    quizScreen: "AVALIAÇÃO EM CURSO",
    failedScreen: "REVISÃO NECESSÁRIA",
    wheelScreen: "RECOMPENSA AUTORIZADA",
    prizeScreen: "MISSÃO FINALIZADA",
  };
  $("missionPhase").textContent = phases[id] || "BRIEFING";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  answered = false;
  const question = QUIZ_QUESTIONS[questionIndex];
  $("progressText").textContent = `QUESTÃO ${questionIndex + 1} DE ${QUIZ_QUESTIONS.length}`;
  $("scoreText").textContent = `${score} ${score === 1 ? "ACERTO" : "ACERTOS"}`;
  $("progressBar").style.width = `${((questionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`;
  $("questionTag").textContent = question.tag;
  $("questionText").textContent = question.text;
  $("feedback").hidden = true;
  $("nextButton").hidden = true;
  $("answers").replaceChildren(...question.answers.map((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    const marker = document.createElement("span");
    marker.className = "answer-index";
    marker.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = answer;
    const arrow = document.createElement("span");
    arrow.className = "answer-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    button.append(marker, label, arrow);
    button.addEventListener("click", () => answerQuestion(index));
    return button;
  }));
}

function answerQuestion(selected) {
  if (answered) return;
  answered = true;
  const question = QUIZ_QUESTIONS[questionIndex];
  const buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("correct");
    if (index === selected && selected !== question.correct) button.classList.add("wrong");
  });
  const correct = selected === question.correct;
  if (correct) score += 1;
  $("scoreText").textContent = `${score} ${score === 1 ? "ACERTO" : "ACERTOS"}`;
  $("feedback").className = `feedback ${correct ? "success" : "error"}`;
  $("feedback").innerHTML = `<strong>${correct ? "CORRETO" : "RESPOSTA INCORRETA"}</strong><span>${question.explanation}</span>`;
  $("feedback").hidden = false;
  $("nextButton").textContent = questionIndex === QUIZ_QUESTIONS.length - 1 ? "VER RESULTADO →" : "PRÓXIMA →";
  $("nextButton").hidden = false;
}

function finishQuiz() {
  if (score >= 4) {
    showScreen("wheelScreen");
    return;
  }
  $("failedScore").textContent = `Você acertou ${score} de ${QUIZ_QUESTIONS.length} perguntas.`;
  showScreen("failedScreen");
}

function resetQuiz() {
  questionIndex = 0;
  score = 0;
  renderQuestion();
  showScreen("quizScreen");
}

function secureRandom() {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0] / 4294967296;
}

function claimCode() {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function renderWheel() {
  const colors = { 1: "#16d9a8", 2: "#ffb11b", 3: "#ff603d", 5: "#ef2748" };
  const step = 360 / PRIZE_SECTORS.length;
  $("wheel").style.background = `conic-gradient(${PRIZE_SECTORS.map((prize, index) => `${colors[prize]} ${index * step}deg ${(index + 1) * step}deg`).join(",")})`;
  $("wheel").replaceChildren(...PRIZE_SECTORS.map((prize, index) => {
    const label = document.createElement("span");
    label.style.transform = `rotate(${index * step + step / 2}deg) translateY(-42%)`;
    label.textContent = prize;
    return label;
  }));
}

function showPrize(result) {
  $("prizeTitle").textContent = `Você ganhou ${result.amount} ${result.amount === 1 ? "bala" : "balas"}!`;
  $("claimCode").textContent = result.code;
  showScreen("prizeScreen");
}

function spinWheel() {
  $("spinButton").disabled = true;
  const prize = selectPrize(secureRandom());
  const step = 360 / PRIZE_SECTORS.length;
  const rotation = 360 * 6 - (prize.sector * step + step / 2);
  $("wheel").style.transform = `rotate(${rotation}deg)`;
  const result = { amount: prize.amount, code: claimCode() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  window.setTimeout(() => showPrize(result), 4300);
}

$("startButton").addEventListener("click", resetQuiz);
$("retryButton").addEventListener("click", resetQuiz);
$("nextButton").addEventListener("click", () => {
  questionIndex += 1;
  if (questionIndex === QUIZ_QUESTIONS.length) finishQuiz();
  else renderQuestion();
});
$("spinButton").addEventListener("click", spinWheel);

renderWheel();
try {
  const savedResult = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedResult && [1, 2, 3, 5].includes(savedResult.amount) && /^[A-F0-9]{6}$/.test(savedResult.code)) {
    showPrize(savedResult);
  }
} catch {
  localStorage.removeItem(STORAGE_KEY);
}
