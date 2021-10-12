/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  question.answers = question.answers.map((answer) => {
    // delete answer.isCorrect;
    return answer;
  });
  return question;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const answerIds = question.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.id);
  return answerIds;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  const answerIds = question.answers
    .map((answer) => answer.id);
  return answerIds;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.countdown;
};

/* for testing with customAssay.js
module.exports.quizQuestionPublicReturn = quizQuestionPublicReturn;
module.exports.quizQuestionGetCorrectAnswers = quizQuestionGetCorrectAnswers;
module.exports.quizQuestionGetAnswers = quizQuestionGetAnswers;
module.exports.quizQuestionGetDuration = quizQuestionGetDuration;
*/
