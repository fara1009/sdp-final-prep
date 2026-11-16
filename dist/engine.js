export const CORE = ['Builder', 'Decorator', 'Strategy', 'Observer', 'Facade'];

export function shuffled(items, random = Math.random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function prepareQuestion(question) {
  const options = shuffled(question.options.map((text, index) => ({text, index})));
  return {...question, options: options.map(o => o.text), answer: options.findIndex(o => o.index === question.answer)};
}

export function examQuestions(questions) {
  const chosen = CORE.flatMap(topic => {
    const pool = questions.filter(q => q.finalCore && q.topic === topic);
    if (pool.length < 6) throw new Error('Недостаточно вопросов по теме ' + topic);
    return shuffled(pool).slice(0, 6);
  });
  return shuffled(chosen);
}

export function createSession(questions, title, mode = 'practice', now = Date.now()) {
  if (!questions.length) throw new Error('В этой подборке пока нет вопросов.');
  return {questions: shuffled(questions).map(prepareQuestion), title, mode, index: 0,
    answers: {}, checked: {}, startedAt: now, deadline: mode === 'exam' ? now + 50 * 60 * 1000 : null};
}

export function scoreSession(session) {
  let correct = 0, answered = 0;
  for (const q of session.questions) {
    if (Number.isInteger(session.answers[q.id])) answered++;
    if (session.answers[q.id] === q.answer) correct++;
  }
  const total = session.questions.length;
  return {correct, answered, total, unanswered: total - answered,
    percent: total ? Math.round(100 * correct / total) : 0,
    points: total ? (80 * correct / total).toFixed(1) : '0.0'};
}

export function remainingSeconds(deadline, now = Date.now()) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
