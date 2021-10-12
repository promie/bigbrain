import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Utilities from '../../../../dataLayer';
import { baseURL } from '../../../../constants';

const QuizUpload = () => {
  const api = new Utilities(baseURL);
  const [responseMessage, setResponseMessage] = useState('Ready to Upload');

  const checkJSON = (questions) => {
    if (!(questions) || (questions.count === 0)) {
      throw new Error('No or empty questions node');
    }

    questions.forEach((value) => {
      if (!value.id || !Number(value.id)) {
        throw new Error('At least one of the questions has no ID');
      }

      if (!value.text || value.text === '') {
        throw new Error(`Question ID ${value.id} has no question text`);
      }

      if (!value.countdown || !Number(value.countdown)) {
        throw new Error(`Question ID ${value.id} has no valid countdown`);
      }

      if (!value.answers || value.answers < 2) {
        throw new Error(`${value.id} has no or too few answers`);
      }

      if (value.answers.filter((a) => a.isCorrect).count === 0) {
        throw new Error('One of the questions has no answers marked as correct.');
      }
      return true;
    });

    return true;
  };

  const createQuiz = async (name) => {
    try {
      const { quizId } = await api.createQuiz(name);
      return quizId;
    } catch (err) {
      throw new Error(`Upload Failed - ${err.status} Error - ${err.statusText}`);
    }
  };

  const editQuiz = async (quizId, name, thumbnail, questions) => {
    try {
      const quiz = await api.editQuiz(quizId, name, thumbnail, questions);
      return quiz;
    } catch (err) {
      throw new Error(`Upload Failed - ${err.status} Error - ${err.statusText}`);
    }
  };

  const processUpload = (name, file) => {
    setResponseMessage('Processing...');
    let questions = null;
    const fileReader = new FileReader();

    fileReader.readAsText(file);

    fileReader.onload = () => {
      questions = JSON.parse(fileReader.result);
      questions.forEach(async (q) => {
        const qImageAdd = q;
        if (!qImageAdd.image) qImageAdd.image = null;
        if (!qImageAdd.youtube) qImageAdd.youtube = null;
      });
      checkJSON(questions);
      createQuiz(name)
        .then((quizId) => editQuiz(quizId, name, null, questions))
        .then(setResponseMessage('Done...'))
        .catch((err) => {
          setResponseMessage(err.message);
        });
    };

    fileReader.onerror = () => {
      throw fileReader.error;
    };
  };

  const preUploadCard = () => (
    <form onSubmit={(event) => {
      try {
        event.preventDefault();
        if (!event.target.quizname.value || !event.target.json.files[0]) {
          throw new Error('Please complete both fields</p>');
        }

        const quizName = event.target.quizname.value;
        const file = event.target.json.files[0];

        setResponseMessage('Processing File');
        processUpload(quizName, file);
        return null;
      } catch (e) {
        setResponseMessage(`${responseMessage}<p>${e.message}</p>`);
        return null;
      }
    }}
    >
      <Box display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
        <Box aria-label="Upload a Quiz JSON file" p={1} bgcolor="grey.300">
          <h1>Upload A Quiz JSON file</h1>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <TextField aria-label="Quiz Name" required id="uploadquizname" label="Quiz Name" name="quizname" />
        </Box>
        <Box p={1} bgcolor="grey.300">
          <label htmlFor="input-quizJSON">
            <h2>Select JSON file:</h2>
            <input aria-label="Select a JSON file" id="input-quizJSON" type="file" name="json" accept=".json" />
          </label>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <Button aria-label="Submit" type="Submit" variant="contained" color="primary">Upload</Button>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <h3>Status: </h3>
          <h4>{responseMessage}</h4>
        </Box>
      </Box>
    </form>
  );

  return (
    <main>
      { preUploadCard() }
    </main>
  );
};

export default QuizUpload;
