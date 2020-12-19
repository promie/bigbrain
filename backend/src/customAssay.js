const {
  quizQuestionPublicReturn,
  quizQuestionGetCorrectAnswers,
  quizQuestionGetAnswers,
  quizQuestionGetDuration,
} = require('./custom');

const question = {
  id: 1,
  text: 'What was the last Aphex Twin album released before his decade-long hiatus?',
  countdown: 20,
  answers: [
    {
      id: 1,
      text: 'Windowlicker',
      isCorrect: false,
    },
    {
      id: 2,
      text: 'Syro',
      isCorrect: false,
    },
    {
      id: 3,
      text: 'Drukqs',
      isCorrect: true,
    },
    {
      id: 4,
      text: 'Collected Ambient Works 85-92',
      isCorrect: false,
    },
  ],
};

let questionCopy = JSON.parse(JSON.stringify(question));

let questionFiltered = quizQuestionPublicReturn(questionCopy);
for (const i of questionFiltered.answers) {
  if (i.isCorrect !== undefined) console.log('quizQuestionPublicReturn failed');
}

questionCopy = JSON.parse(JSON.stringify(question));

questionFiltered = quizQuestionGetCorrectAnswers(questionCopy);
// eslint-disable-next-line comma-spacing
// eslint-disable-next-line comma-dangle
if (JSON.stringify(questionFiltered) !== JSON.stringify([3])) console.log('quizQuestionGetCorrectAnswers failed');

questionCopy = JSON.parse(JSON.stringify(question));

questionFiltered = quizQuestionGetAnswers(questionCopy);
// eslint-disable-next-line comma-spacing
// eslint-disable-next-line comma-dangle
if (JSON.stringify(questionFiltered) !== JSON.stringify([1, 2, 3, 4])) console.log('quizQuestionGetAnswers failed');

questionCopy = JSON.parse(JSON.stringify(question));

questionFiltered = quizQuestionGetDuration(questionCopy);
if (questionFiltered !== 30) console.log('quizQuestionGetDuration failed');
