/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { MdAlarm } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useCountdownTimer } from 'use-countdown-timer';
import useStyles from './styles';
import Logo from '../../assets/logo.png';
import Utilities from '../../dataLayer';
import { baseURL } from '../../constants';
import FallBackImage from '../../assets/unavailable.png';

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const GameStart = () => {
  const { playerId } = useParams();

  const [playerName, setPlayerName] = useState('');
  const [value, setValue] = useState(0);
  const [getQuestionsError, setQuestionsError] = useState(false);
  const [getQuestionsErrorMessage, setQuestionsErrorMessage] = useState('');
  const [question, setQuestion] = useState({});
  const [answerValue, setAnswerValue] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showAnswerPanel, setShowAnswerPanel] = useState(false);
  const [playersResponse, setPlayersResponse] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  const [questionCountdown, setQuestionCountdown] = useState(30000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const api = new Utilities(baseURL);

  const classes = useStyles();

  const getQuestion = () => {
    api
      .getQuestionForPlayer(playerId)
      .then((response) => {
        setQuestionCountdown(response.question.countdown * 1000);
        setQuestion(response.question);

        setTimeout(() => {
          setIsSessionActive(true);
        }, 2000);
      })
      .catch((error) => {
        error.json().then((err) => {
          if (err.error === 'Session has not started yet') {
            setQuestionsError(true);
            setQuestionsErrorMessage(
              `${err.error}. Please sit tight and wait for the host to start the game. (The page refreshes every 10 seconds).`,
            );

            setTimeout(() => {
              window.location.reload();
            }, 10000);
          } else {
            setQuestionsError(true);
            setQuestionsErrorMessage(err.error);
          }
        });
      });
  };

  const handleAnswerChange = (event) => {
    setAnswerValue(event.target.value);
  };

  const handleOpen = () => {
    if (isSessionActive) {
      setShowAnswerPanel(true);
      api.getAnswerForPlayer(playerId).then((response) => {
        setCorrectAnswer(response.answerIds);
      });
      setAlreadyAnswered(true);

      setTimeout(() => {
        getQuestion();
      }, 3000);
    }
  };

  const { countdown, start } = useCountdownTimer({
    timer: questionCountdown,
    onExpire: handleOpen,
  });

  useEffect(() => {
    setPlayerName(localStorage.getItem('playerName'));
    getQuestion();
  }, [questionCountdown]);

  const submitAnswerForQuestion = (e) => {
    e.preventDefault();
    api.answerQuestionForPlayer(playerId, answerValue).then(() => {
      setPlayersResponse(answerValue);
    });
  };

  const questionImage = question.image === null ? FallBackImage : question.image;

  // const getAnswerFromObject = (answer) => question.answers.find((o) => o.id === answer).text;

  const isCorrect = correctAnswer.includes(playersResponse);

  return (
    <main className={classes.wrapper}>
      <div className={classes.playGameSection}>
        <div className={classes.gamePIN}>
          <div>
            <img src={Logo} alt="big brain logo" className={classes.logo} />
            <div>
              <div className={classes.welcomePlayer}>
                Welcome,
                {' '}
                {playerName}
              </div>
              <div className={classes.root}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab label="Quiz" {...a11yProps(0)} onClick={getQuestion} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                  {getQuestionsError ? (
                    getQuestionsErrorMessage
                  ) : (
                    <div className={classes.questionWrapper}>
                      <div className={classes.headerWrapper}>
                        <div className={classes.question}>QUESTION:</div>
                        <div className={classes.timer}>
                          <MdAlarm
                            className={classes.icon}
                            onClick={() => start()}
                          />
                          {' '}
                          <span>
                            {countdown / 1000}
                            {' '}
                            Seconds
                          </span>
                        </div>
                        <div className={classes.points}>
                          <GrScorecard className={classes.icon} />
                          {' '}
                          <span>
                            {question.points}
                            {' '}
                            Points
                          </span>
                        </div>
                      </div>
                      <div className={classes.questionText}>
                        {question.text}
                      </div>
                      <div className={classes.answersList}>
                        <div className={classes.thumbnailQuestion}>
                          <img
                            src={questionImage}
                            alt="quiz"
                            className={classes.questionImage}
                          />
                        </div>

                        <div className={classes.fieldSet}>
                          <FormControl component="fieldset">
                            <FormLabel
                              component="legend"
                              className={classes.hideContent}
                            >
                              Answer
                            </FormLabel>
                            <RadioGroup
                              aria-label="gender"
                              name="gender1"
                              value={answerValue}
                              onChange={handleAnswerChange}
                            >
                              {question.answers
                                && question.answers.map((answer) => (
                                  // eslint-disable-next-line max-len
                                  <FormControlLabel
                                    value={answer.id}
                                    key={answer.id}
                                    control={<Radio />}
                                    label={answer.text}
                                    disabled={alreadyAnswered}
                                  />
                                ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>

                      {showAnswerPanel && (
                        <div className={classes.yourAnswerPanel}>
                          {isCorrect
                            ? ' Your answer is correct'
                            : 'Your answer is incorrect'}
                        </div>
                      )}

                      <div className={classes.submitBtn}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.btn}
                          onClick={submitAnswerForQuestion}
                          disabled={alreadyAnswered}
                        >
                          Submit Answer
                        </Button>
                      </div>
                    </div>
                  )}
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameStart;
