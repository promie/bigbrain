import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import QuizzesList from '../components/QuizzesList';
import useStyles from './styles';
import QuizImage from '../../../../assets/quiz.png';
import Utilities from '../../../../dataLayer';
import { baseURL } from '../../../../constants';

const getModalStyle = () => {
  const top = 50 + 2;
  const left = 50 + 2;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const initialState = {
  name: '',
};

const Quizzes = () => {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const api = new Utilities(baseURL);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (data.name !== '') {
      setIsFormValid(true);
    }

    if (value === '') {
      setIsFormValid(false);
    }

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name } = data;
    setLoading(true);

    setTimeout(() => {
      api.createQuiz(name).then((response) => {
        const { quizId } = response;

        setLoading(false);
        setData(initialState);
        setOpen(false);

        navigate(`/quiz/${quizId}/edit`);
      });
    }, 2000);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={classes.center}>
        <h1 className={classes.spacer}>New Quiz</h1>
        <img alt="quiz" src={QuizImage} className={classes.quizImage} />
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading && <CircularProgress size={27} />}
          {!loading && 'Add'}
        </Button>
      </form>
    </div>
  );

  return (
    <main>
      <section className={classes.moveRight}>
        <div className={classes.btnsContainer}>
          <div className={classes.btnGroupOne}>
            <Button variant="contained" color="primary" onClick={handleOpen} className={classes.createQuizBtn}>
              Create New Quiz
            </Button>
          </div>

          <div className={classes.btnGroupTwo}>
            <Button variant="contained" href="/quizzes/upload" color="primary" className={classes.jsonBtn}>
              Upload a Quiz JSON File
            </Button>
            <Button
              variant="contained"
              href="/quizzes/download"
              color="primary"
              className={classes.suggestionBtn}
            >
              Let Us Suggest Questions!
            </Button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </section>
      <section>
        <QuizzesList />
      </section>
    </main>
  );
};

export default Quizzes;
