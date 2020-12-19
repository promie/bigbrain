import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Utilities from '../../../../dataLayer';
import { baseURL } from '../../../../constants';
import QuestionItemDownload from '../components/QuestionItem/QuestionItemDownload';

const QuizAPIDownload = () => {
  const [responseMessage, setResponseMessage] = useState('Ready to download');
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState([]);
  const quizDBUrl = 'https://opentdb.com/api.php';
  const api = new Utilities(baseURL);

  const removeEscapes = (statement) => {
    let text = statement;
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#039;/g, '');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&ouml;/g, '');
    text = text.replace(/&lt;/g, ' less than ');
    text = text.replace(/&gt;/g, ' greater than ');
    return text;
  };

  const getQuizQuestions = async (numQuestions) => {
    try {
      const response = await fetch(`${quizDBUrl}?amount=${numQuestions}`);
      const qsFromAPI = await response.json();
      const qTranslated = [];
      qsFromAPI.results.forEach((qFromAPI) => {
        const question = {
          id: `${Math.floor(Math.random() * 10000001)}`,
          text: removeEscapes(qFromAPI.question),
          countdown: 30,
          points: 5,
          image: null,
          youtube: null,
          answers: [
            {
              id: `${Math.floor(Math.random() * 10000001)}`,
              text: removeEscapes(qFromAPI.correct_answer),
              isCorrect: true,
            },
          ],
        };

        qFromAPI.incorrect_answers.forEach((answer) => {
          question.answers.push({
            id: `${Math.floor(Math.random() * 10000001)}`,
            text: answer,
            isCorrect: false,
          });
        });

        question.answers.sort(() => 0.5 - Math.random());
        qTranslated.push(question);
      });
      return qTranslated;
    } catch (err) {
      return err;
    }
  };

  const displayQuestions = () => {
    const questionItems = questions.map((question) => (
      <QuestionItemDownload
        text={question.text}
        countdown={question.countdown}
        points={question.countdown}
        image={question.image}
        answers={question.answers}
        aria-label="Question Details"
      />
    ));

    return questionItems;
  };

  const createQuiz = async (quizName) => {
    try {
      const { quizId } = await api.createQuiz(quizName);
      return quizId;
    } catch (err) {
      throw new Error(`Upload Failed - ${err.status} Error - ${err.statusText}`);
    }
  };

  const editQuiz = async (quizId, quizName, thumbnail, quizQuestions) => {
    try {
      const quiz = await api.editQuiz(quizId, quizName, thumbnail, quizQuestions);
      return quiz;
    } catch (err) {
      throw new Error(`Upload Failed - ${err.status} Error - ${err.statusText}`);
    }
  };

  const saveQuestions = (event) => {
    if (!name || name === '') {
      setResponseMessage('Please enter a name...');
      return null;
    }
    event.preventDefault();
    setResponseMessage('Processing...');
    createQuiz(name)
      .then((quizId) => editQuiz(quizId, name, null, questions))
      .then(setResponseMessage('Done...'))
      .catch((err) => {
        setResponseMessage(err.message);
      });
    return true;
  };

  const preUploadCard = () => (
    <form onSubmit={(event) => {
      event.preventDefault();
      const nQuestions = Number(event.target.numQuestions.value) || 5;
      getQuizQuestions(nQuestions)
        .then((q) => setQuestions(q))
        .catch((err) => setResponseMessage(err.statusText));
    }}
    >
      <Box display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
        <Box p={1} bgcolor="grey.300">
          <h1>Let Us Pick Your Questions For You!</h1>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <TextField
            required
            label="Quiz Name"
            name="name"
            aria-label="Set Quiz Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Box>
        <Box p={1} bgcolor="grey.300">
          <TextField required label="No. of Questions" name="numQuestions" />
        </Box>
        <Box p={1} bgcolor="grey.300">
          <Button aria-label="Download Questions" type="Submit" variant="contained" color="primary">Download Questions</Button>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <h3>Status: </h3>
          <h4>{responseMessage}</h4>
        </Box>
      </Box>
    </form>
  );

  return (
    <section>
      {preUploadCard()}
      <Box p={1} bgcolor="grey.300">
        <Button type="Submit" variant="contained" color="primary" onClick={saveQuestions}>Save Questions</Button>
      </Box>
      {displayQuestions()}
    </section>
  );
};

export default QuizAPIDownload;
