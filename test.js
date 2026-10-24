const assert = require("node:assert/strict");
const { QUIZ_QUESTIONS, PRIZE_SECTORS, selectPrize } = require("./quiz-core.js");

assert.equal(QUIZ_QUESTIONS.length, 5);
assert.ok(QUIZ_QUESTIONS.every((question) => question.answers.length === 4));
assert.ok(QUIZ_QUESTIONS.every((question) => question.correct >= 0 && question.correct < 4));
assert.deepEqual(PRIZE_SECTORS.reduce((counts, prize) => ({ ...counts, [prize]: (counts[prize] || 0) + 1 }), {}), { 1: 10, 2: 6, 3: 3, 5: 1 });
assert.deepEqual(selectPrize(0), { sector: 0, amount: 1 });
assert.deepEqual(selectPrize(0.999999), { sector: 19, amount: 2 });
assert.throws(() => selectPrize(1), RangeError);

console.log("Quiz validado: perguntas e distribuição da roleta estão corretas.");
