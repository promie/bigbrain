/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdAlarm, MdDone, MdClear } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getInitialFromLoggedInUser } from '../../../../../helpers';
import useStyles from './styles';
import Utilities from '../../../../../dataLayer';
import { baseURL } from '../../../../../constants';
import FallBackImage from '../../../../../assets/unavailable.png';

function getModalStyle() {
  const top = 50 + 2;
  const left = 50 + 2;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const QuizListItem = (({
  id,
  name,
  thumbnail,
  createdAt,
  owner,
}) => {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [gameQuestions, setGameQuestions] = useState(false);
  const [copied, setCopy] = useState(false);
  const [data, setData] = useState({});
  const [toggleSessionReport, setToggleSessionReport] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [displayPlayPanel, setDisplayPlayPanel] = useState(true);
  const [currentStage, setCurrentStage] = useState(gameQuestions.length || 0);
  const [displayFinaliseSection, setDisplayFinaliseSection] = useState(false);
  const [displayEndSessionBtn, setDisplayEndSessionBtn] = useState(true);

  // This is the actual game questions
  const [quizQuestion, setQuizQuestion] = useState({});

  const classes = useStyles();
  const formattedDate = moment(createdAt).format('Do MMMM YYYY');

  const api = new Utilities(baseURL);
  const navigate = useNavigate();

  if (!id) return null;
  if (!name) return null;

  const fetchData = () => {
    api
      .getQuiz(id)
      .then((response) => {
        setGameQuestions(response.questions);
        setData(response);
      })
      .catch((error) => {
        error.json().then((err) => {
          // eslint-disable-next-line no-console
          console.error(err.error);
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGameOpen = () => {
    if (!data.active) {
      api.startQuizGame(id).then(() => {
        fetchData();
        setOpenGame(true);
      });
    } else {
      setOpenGame(true);
    }
  };

  const handleGameClose = () => {
    setToggleSessionReport(false);
    setOpenGame(false);
    setCopy(false);
    fetchData();
  };

  const endSessionWithResults = () => {
    api.endQuizGame(id).then(() => {
      fetchData();
      setToggleSessionReport(false);
      setCopy(false);
      setQuizStarted(false);
      setOpenGame(false);
      setDisplayPlayPanel(true);
      navigate(`/dashboard/quiz/${id}/results/${data.active}`);
    });
  };

  const endSession = () => {
    api.endQuizGame(id).then(() => {
      fetchData();
      setToggleSessionReport(false);
      setCopy(false);
      setQuizStarted(false);
      setOpenGame(false);
      setDisplayPlayPanel(true);
      window.location.reload();
    });
  };

  const advanceQuiz = () => {
    // When the game is finished
    if (currentStage >= gameQuestions.length) {
      const sessionId = data.active;

      setDisplayPlayPanel(false);
      setDisplayFinaliseSection(true);
      setDisplayEndSessionBtn(false);

      api.endQuizGame(id).then(() => {
        api.getSessionResults(sessionId).then(() => {
          // TODO display the results here just as a summary
        });
      });
    } else {
      api.advanceQuizToNextQuestion(id).then((response) => {
        setQuizStarted(true);
        setQuizQuestion(gameQuestions[response.stage]);
        setCurrentStage(response.stage + 1);
      });
    }
  };

  const onCopy = () => {
    setCopy(true);
  };

  const deleteQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      api.deleteQuiz(id).then(() => {
        setLoading(false);
        setOpen(false);
        window.location.reload();
      });
    }, 2000);
  };

  const viewQuizResult = () => {
    setDisplayFinaliseSection(false);
    setDisplayPlayPanel(true);
    setDisplayEndSessionBtn(true);
    setQuizStarted(false);
    setOpenGame(false);
    navigate(`/dashboard/quiz/${id}/results/${data.active}`);
  };

  const deletionMessage = `Are you sure you want to delete "${name}"?`;

  const deleteBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete Quiz</h2>
      <hr />
      <p id="simple-modal-description" className={classes.modalDescription}>
        {deletionMessage}
      </p>
      <Button
        variant="outlined"
        color="primary"
        className={classes.cancelBtn}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteQuiz}
      >
        {loading && <CircularProgress size={27} />}
        {!loading && 'Delete'}
      </Button>
    </div>
  );

  const displaySessionReport = () => {
    setToggleSessionReport(!toggleSessionReport);
    setQuizStarted(!quizStarted);
    setDisplayPlayPanel(!displayPlayPanel);
  };

  const quizImage = thumbnail === null ? FallBackImage : thumbnail;
  const gameSessionURL = `${window.location.protocol}//${window.location.host}/join/${data.active}`;

  const quizQuestionImage = quizQuestion.image === null ? FallBackImage : quizQuestion.image;

  const gameOn = (
    <div style={modalStyle} className={classes.game}>
      <div className={classes.questionSection}>

        <div className={classes.gameThumbnailSection}>
          <div className={classes.quizImageSection}>
            <img src={quizImage} alt="quiz pic" className={classes.quizImage} />
          </div>
          <div className={classes.quizInfo}>
            <div className={classes.quizName}>{name}</div>
            <div className={classes.questionsNumber}>
              {gameQuestions.length}
              {' '}
              {gameQuestions.length > 1 ? 'questions' : 'question'}
            </div>
          </div>
        </div>

        {displayFinaliseSection && (
          <div className={classes.sessionIDSection}>
            <div className={classes.showResultsSection}>
              {/* // TODO FILL OUT THE RESULTS PAGE */}
              <div className={classes.quizResultInfo}>WHAT INFO IS AVAILABLE FOR ME?</div>
              <div className={classes.endSessionsBtnGroup}>
                <div>
                  <Button variant="contained" color="primary" className={classes.sessionBtn} onClick={viewQuizResult}>VIEW QUIZ RESULTS</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {displayPlayPanel && (
          quizStarted ? (
            <div className={classes.sessionIDSection}>
              <div className={classes.headerWrapper}>
                <div className={classes.question}>QUESTION:</div>
                <div className={classes.timer}>
                  <MdAlarm className={classes.icon} />
                  {' '}
                  <span>
                    {quizQuestion.countdown}
                    {' '}
                    Seconds
                  </span>
                </div>
                <div className={classes.points}>
                  <GrScorecard className={classes.icon} />
                  {' '}
                  <span>
                    {quizQuestion.points}
                    {' '}
                    Points
                  </span>
                </div>
              </div>

              <div className={classes.questionText}>{quizQuestion.text}</div>
              <div className={classes.answersList}>
                <div className={classes.thumbnailQuestion}>
                  <img src={quizQuestionImage} alt="quiz" className={classes.questionImage} />
                </div>

                <div className={classes.fieldSet}>
                  <List className={classes.answersWrapper}>
                    {quizQuestion.answers && quizQuestion.answers.map((answer) => (
                      <ListItem key={answer.id} className={classes.answersContainer}>
                        <ListItemText className={classes.answer}>
                          {answer.text}
                        </ListItemText>

                        <ListItemText className={classes.answerStatus}>
                          {answer.isCorrect
                            ? <MdDone className={classes.correctAnswer} />
                            : <MdClear className={classes.incorrectAnswer} />}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>

              <div className={classes.buttonGroup}>
                {/* <div className={classes.resultsBtn}>
                  <Button variant="contained" color="primary" href="https://www.google.com/" target="_blank">View Results</Button>
                </div> */}
                <div className={classes.nextQuestionBtn}>
                  <Button variant="contained" color="primary" onClick={advanceQuiz}>Next Question</Button>
                </div>
              </div>

            </div>
          ) : (
            <div className={classes.sessionIDSection}>
              <div className={classes.joinGameText}>
                Join BigBrain Quiz game for
                {' '}
                <span className={classes.quizTitle}>{name}</span>
                !
                <br />
                {' '}
                Click on the below GAME PIN to get started:
              </div>
              <div className={classes.sessionID}>
                <CopyToClipboard onCopy={onCopy} text={gameSessionURL}>
                  <span className={classes.quizTitle}>{data.active}</span>
                </CopyToClipboard>
              </div>
              { copied && (
              <div>
                <p className={classes.copied}>URL successfully copied to clipboard.</p>
                <Button variant="contained" color="primary" onClick={advanceQuiz} className={classes.startQuizBtn}>START QUIZ</Button>
              </div>
              )}
            </div>
          )
        )}

        {displayEndSessionBtn && (
        <div className={classes.endSessionBtn}>
          <Button variant="contained" color="secondary" onClick={displaySessionReport}>{displayPlayPanel ? 'End Session' : 'Back To Quiz'}</Button>
        </div>
        )}

        {toggleSessionReport && (
        <div className={classes.displayArea}>
          <h2>Would you like to view the results?</h2>
          <Button variant="contained" color="primary" className={classes.yesButton} onClick={endSessionWithResults}>YES</Button>
          <Button variant="contained" color="secondary" onClick={endSession}>NO</Button>
        </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="user avatar" className={classes.avatar}>
            {getInitialFromLoggedInUser(owner)}
          </Avatar>
        )}
        title={name}
        subheader={formattedDate}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title="quiz thumbnail"
      />
      <CardContent>
        <Chip
          label={data.active ? 'Active' : 'Inactive'}
          color={data.active ? 'primary' : 'secondary'}
          variant="outlined"
        />
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/quiz/${id}/edit`}>
          <IconButton aria-label="edit quiz button">
            <CreateIcon />
          </IconButton>
        </Link>

        <div>
          <IconButton aria-label="delete quiz" onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {deleteBody}
          </Modal>
        </div>

        <IconButton className={clsx(classes.expand)} onClick={handleGameOpen}>
          <PlayArrowIcon />
        </IconButton>

        <Modal
          open={openGame}
          onClose={handleGameClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {gameOn}
        </Modal>
      </CardActions>
    </Card>
  );
});

QuizListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default QuizListItem;
