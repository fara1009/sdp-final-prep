# PatternLab — Software Design Patterns final preparation

A small responsive study website in Russian, with English multiple-choice questions.

Public website: https://sdp-final-prep-fara1009.eleganthobby.chatgpt.site

## Included

- Concise summaries of the five supplied lectures: 1 (Builder), 5 (Decorator), 6 (Facade), 7 (Strategy), and 8 (Observer), including their Clean Code sections.
- All 160 questions from the four supplied quiz exports.
- 54 additional questions based on the lectures.
- Learning mode with Russian explanations; topic and text search.
- A 30-question, 50-minute mock exam: six questions per final-project pattern. This is a practice distribution, not a prediction of the official exam.
- Result review, retries, a mistake queue, read-lecture markers, and recent attempts.
- Browser-local progress and automatic resume. No login, server database or personal data collection.

## Sources and answer provenance

Summaries are based on the user-supplied `Lecture 1 (1).pdf`, `Lecture 5 (1).pdf`, `Lecture 6 (1).pdf`, `Lecture 7 (1).pdf`, and `Lecture 8 (3).pdf`. Full PDFs and original graded exports are not included. Source references appear inside each summary and explanation.

Quiz 1 (Adapter) did not include a correct-answer key; its 40 answers were reconstructed and marked `inferred`. Quizzes 2–4 use the supplied feedback keys. Moodle marks and embedded answer hints were removed. Russian explanations, original practice questions and code were prepared with AI assistance. This is an unofficial study aid, not an official exam bank.

The provided Final Project Student Guide states: 30 questions, 50 minutes, one correct option, no negative marking; MCQ score = 80 × correct / 30. Mock-exam scores are practice estimates only. Extra topics in older quizzes remain available in general practice.

## Run locally

Serve the `dist` directory with any static HTTP server. For example, from this folder with Python installed:

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173. No installation or build is required. Use a server rather than opening `index.html` with a `file://` URL because the app uses JavaScript modules.

## Checks

With Node.js installed:

```sh
node --test tests.mjs
```

Tests verify question integrity, balanced exam selection, correct-answer preservation during option shuffling, scoring, and absolute deadlines. The app is also checked interactively in a browser before publication.

## Files

- `dist/index.html`, `style.css`, `favicon.svg`: page structure and responsive appearance.
- `dist/data.js`: summaries, questions, keys and explanations.
- `dist/engine.js`: question selection, randomization, scoring and timing helpers.
- `dist/app.js`: navigation, quiz interaction and local storage.
- `.openai/hosting.json`: static hosting configuration; contains no credential.

Progress is stored only in the current browser. Clearing browser data or using another device starts a separate history. The exam countdown continues while the tab is closed. No raw lecture PDFs, grades, credentials or personal account information are published.
