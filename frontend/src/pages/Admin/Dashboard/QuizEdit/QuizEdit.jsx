/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MdDone, MdClear } from 'react-icons/md';
import fileToDataUrl from './helpers';
import Utilities from '../../../../dataLayer';
import { baseURL } from '../../../../constants';
import Quiz from '../components/Quiz';
import useStyles from './styles';
import EditQuizImage from '../../../../assets/quizedit.png';
import NewQuestion from '../../../../assets/newquestion.png';
import FallbackImage from '../../../../assets/unavailable.png';
import NewAnswer from '../../../../assets/newanswer.svg';

function getModalStyle() {
  const top = 50 + 2;
  const left = 50 + 2;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const QuizEdit = () => {
  const { id, questionId } = useParams();
  const [data, setData] = useState({});
  const [refresh, triggerRefresh] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
  const [activeState] = useState(true);
  const [checked, setChecked] = useState(false);

  const classes = useStyles();
  const api = new Utilities(baseURL);

  let editData = JSON.parse(JSON.stringify(data));
  const navigate = useNavigate();

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'textfield-quizname':
        editData.name = event.target.value;
        break;
      case 'input-quizimage':
        fileToDataUrl(event.target.files[0])
          .then((dataUrl) => {
            editData.thumbnail = dataUrl;
          });
        break;
      case 'textfield-quizactive':
        editData.active = event.target.value;
        break;
      default:
        break;
    }
  };

  const toggleCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenNewQuestion = () => {
    setOpenNewQuestion(true);
  };

  const handleCloseNewQuestion = () => {
    setOpenNewQuestion(false);
  };

  const saveChange = () => {
    api.editQuiz(id, editData.name, editData.thumbnail, editData.questions)
      .then(() => {
        setData(editData);
        triggerRefresh(!refresh);
        setOpenEdit(false);
      })
      .catch((error) => {
        error.json()
          .then((err) => {
            // eslint-disable-next-line no-console
            console.error(err.error);
          });
      });
  };

  useEffect(() => {
    const fetchData = () => {
      api
        .getQuiz(id)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          error.json().then((err) => {
            // eslint-disable-next-line no-console
            console.error(err.error);
          });
        });
    };
    fetchData();
  }, [id]);

  const triggerModal = () => {
    handleOpenEdit();
  };

  editData = data;
  const quizItem = (quiz) => (
    <Quiz
      name={quiz.name}
      thumbnail={quiz.thumbnail}
      active={quiz.active ? quiz.active : false}
      questions={quiz.questions}
      quiz={quiz}
      triggerModal={triggerModal}
    />
  );

  const editItemEdit = (quiz) => {
    const quizImage = quiz.thumbnail === null ? FallbackImage : quiz.thumbnail;

    return (
      <div style={modalStyle} className={classes.editModal}>
        <div className={classes.center}>
          <h1>Edit Quiz</h1>
          <img alt="edit quiz" src={EditQuizImage} className={classes.quizImage} />
        </div>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField aria-label="Quiz Name" required id="textfield-quizname" label="Quiz Name" defaultValue={quiz.name} onChange={handleChange} variant="outlined" />
          <TextField
            variant="outlined"
            select
            id="textfield-quizactive"
            label="Status"
            aria-label="Quiz Active or Inactive"
            defaultValue={quiz.active ? quiz.active : false}
            onChange={handleChange}
            className={classes.hideContent}
          >
            <MenuItem key={activeState} value={activeState}>Active</MenuItem>
            <MenuItem key={false} value={false}>Inactive</MenuItem>
          </TextField>
          <div className={classes.imageUpload}>
            <img alt={quiz.name} src={quizImage} className={classes.thumbnail} />
            <label htmlFor="input-quizimage" className={classes.imageUploadLabel}>
              <input
                aria-label="Upload Quiz Image"
                id="input-quizimage"
                type="file"
                name="img"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </div>
          <Button onClick={saveChange} variant="contained" color="primary">Save Quiz Details</Button>
        </form>

      </div>
    );
  };

  const body = (
    <div style={modalStyle} className={classes.newQuestionModal}>
      <form
        aria-label="Edit Question"
        id="editQuestion-addQuestion"
        display="block"
        onSubmit={async (event) => {
          event.preventDefault();
          const question = {
            id: event.target.id.value,
            text: event.target.text.value,
            countdown: Number(event.target.countdown.value),
            points: Number(event.target.points.value),
            image: await fileToDataUrl(event.target.img.files[0]),
            youtube: event.target.youtube.value,
            answers: [],
          };
          editData.questions.push(question);
          saveChange();

          document.getElementById('editQuestion-addQuestion').reset();
          setOpenNewQuestion(false);
          navigate(`/quiz/${id}/question/${event.target.id.value}/edit`);
        }}
      >
        <div className={classes.center}>
          <h1>Add Question</h1>
          <img src={NewQuestion} alt="new question" className={classes.quizImage} />
        </div>

        <div className={classes.root}>
          <TextField name="id" value={Math.floor(Math.random() * 1000001)} className={classes.hideContent} />
          <TextField aria-label="Enter Question" name="text" label="Enter the question here" variant="outlined" required />
          <TextField aria-label="Enter YouTube URL" name="youtube" label="URL of any image or Youtube clip" variant="outlined" className={classes.hideContent} />
          <TextField aria-label="Countdown (sec)" name="countdown" label="Countdown(s)" defaultValue="30" required variant="outlined" />
          <TextField aria-label="Number of Points" name="points" label="Points" defaultValue="10" required variant="outlined" />
          <label htmlFor="input-quizimage" className={classes.hideContent}>
            Select thumbnail:
            <input aria-label="Thumbnail" type="file" name="img" accept="image/*" />
          </label>
          <Button aria-label="Save Question" id="saveQuestion" type="Submit" variant="contained" color="primary">Save Question</Button>
        </div>
      </form>
    </div>
  );

  const addAnswer = (questionID) => {
    let question = {};
    if (!questionID || !editData.questions) return null;
    [question] = editData.questions.filter((q) => q.id === questionID);
    if (!question) return null; // throw new Error(`Question with id ${questionID} does not exist`);

    return (
      <form
        id="editQuestion-addAnswer"
        display="block"
        onSubmit={(event) => {
          [question] = editData.questions.filter((q) => q.id === questionId);
          const answer = {
            id: event.target.id.value,
            text: event.target.text.value,
            isCorrect: event.target.isCorrect.checked,
          };
          question.answers.push(answer);
          saveChange();
          document.getElementById('editQuestion-addAnswer').reset();
          setChecked(false);
          event.preventDefault();
        }}
      >
        <div className={classes.center}>
          <div className={classes.addAnswerText}>Add Answer</div>
          <img src={NewAnswer} alt="new answer" className={classes.quizImage} />
        </div>

        <div className={classes.root}>
          <TextField name="id" value={Math.floor(Math.random() * 10000001)} variant="outlined" className={classes.hideContent} />
          <TextField aria-label="Enter Answer" name="text" label="Enter the answer here" required variant="outlined" />
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={toggleCheckBox}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                name="isCorrect"
              />
          )}
            label="Correct Answer"
            className={classes.correctAnswerCheckbox}
          />
          <input aria-label="Submit" name="Submit" type="Submit" value="Save Answer" className={classes.buttonLike} />
        </div>
      </form>
    );
  };

  const editQuestion = (questionID) => {
    let question = {};
    if (!questionID || !editData.questions) return null;
    [question] = editData.questions.filter((q) => q.id === questionID);
    if (!question) return null; // throw new Error(`Question with id ${questionID} does not exist`);

    const questionImage = question.image === null ? FallbackImage : question.image;

    return (
      <section className={classes.qaWrapper}>
        <div className={classes.editQuestionSection}>
          <form
            display="block"
            onSubmit={async (event) => {
              event.preventDefault();
              question.text = event.target.text.value;
              if (event.target.img.files[0]) {
                question.image = await fileToDataUrl(event.target.img.files[0]);
              }
              question.countdown = event.target.countdown.value;
              question.points = event.target.points.value;
              saveChange();
              navigate(`/quiz/${id}/edit`);
            }}
          >
            <div className={classes.root}>
              <TextField aria-label="Question" name="text" label="Question" defaultValue={question.text} required variant="outlined" className={classes.mainQuestion} />
              <TextField aria-label="Countdown (sec)" name="countdown" label="Countdown(s)" defaultValue={question.countdown} required variant="outlined" />
              <TextField aria-label="points" name="points" label="Points" defaultValue={question.points} required variant="outlined" />
              <img aria-label="Question Image" src={questionImage} alt="question" className={classes.questionImage} />
              <div className={classes.mediaUpload}>
                <div className={classes.imageUploadSection}>
                  <label aria-label="Quiz Image" htmlFor="input-quizimage">
                    Select thumbnail:
                    <input type="file" name="img" accept="image/*" />
                  </label>
                </div>

                <div className={classes.youtubeSection}>
                  <TextField aria-label="Youtube URL" name="youtube" label="YouTube URL (Optional)" defaultValue={question.youtube} variant="outlined" className={classes.youtubeInput} />
                </div>

              </div>
            </div>

            <div>
              {question.answers.length ? <h1 className={classes.listAnswers}>Answers:</h1> : ''}
              <List>
                {question.answers.map((answer) => (
                  <ListItem key={answer.id} className={classes.answersContainer}>
                    <ListItemText className={classes.answer}>
                      {answer.text}
                    </ListItemText>
                    <ListItemText className={classes.status}>
                      {answer.isCorrect
                        ? <MdDone className={classes.correctAnswer} />
                        : <MdClear className={classes.incorrectAnswer} /> }
                    </ListItemText>
                    <input
                      type="button"
                      value="X"
                      className={classes.removeBtnLike}
                      data-an={answer.id}
                      onClick={(event) => {
                        event.preventDefault();
                        const questionToAddTo = editData.questions.filter(
                          (q) => q.id === questionId,
                        )[0];
                        questionToAddTo.answers = questionToAddTo.answers.filter(
                          (a) => a.id !== event.target.dataset.an,
                        );
                        saveChange();
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>

            <div className={classes.actionBtnGroup}>
              <input aria-label="Submit Question" id="saveQuestion" type="Submit" value="Save Question" className={classes.primaryButtonLike} />
              <input
                aria-label="Delete Question"
                type="button"
                value="Delete Question"
                className={classes.secondaryButtonLike}
                data-qs={questionID}
                onClick={(event) => {
                  event.preventDefault();
                  // eslint-disable-next-line max-len
                  editData.questions = editData.questions.filter((q) => q.id !== event.target.dataset.qs);
                  saveChange();
                  navigate(`/quiz/${id}/edit`);
                }}
              />
            </div>

          </form>
        </div>

        <div className={classes.addAnswerSection}>
          {addAnswer(questionID)}
        </div>

      </section>
    );
  };

  return (
    <section>
      { questionId ? editQuestion(questionId) : (
        <div>
          <div className={classes.addQuestionBtn}>
            <Button variant="contained" color="secondary" onClick={handleOpenNewQuestion}>
              ADD QUESTION
            </Button>
          </div>

          <Modal
            open={openNewQuestion}
            onClose={handleCloseNewQuestion}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
          {quizItem(editData)}
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {editItemEdit(editData)}
          </Modal>
        </div>
      )}

    </section>
  );
};

export default QuizEdit;
