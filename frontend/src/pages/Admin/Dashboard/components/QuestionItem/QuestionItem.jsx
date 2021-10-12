import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { MdDone, MdClear } from 'react-icons/md';
import useStyles from './styles';
import FallBackImage from '../../../../../assets/unavailable.png';

const QuestionItem = (
  {
    questionId,
    text,
    image,
    countdown,
    points,
    youtube,
    answers,
  },
) => {
  const { id } = useParams();
  const classes = useStyles();

  const quizImage = image === null ? FallBackImage : image;
  const [expanded, setExpanded] = useState(false);

  const toggleAnswer = () => {
    setExpanded(!expanded);
  };

  return (
    <main>
      <Grid container className={classes.container}>
        <Grid
          aria-label="question details"
          item
          xs={10}
          md={10}
          onClick={toggleAnswer}
          className={classes.questionSection}
        >
          <div className={classes.questionWrapper}>
            <div className={classes.questionTitle}>{text}</div>
            <div className={classes.hideContent}>{ youtube}</div>

            <div aria-label="countdown in seconds" className={classes.countdownText}>
              {`Countdown time (s) = ${countdown}`}
            </div>
            <div className={classes.pointsText} aria-label="points">{`Points = ${points}`}</div>

            {questionId && (
              <div className={classes.linkWrapper}>
                <Link
                  to={`/quiz/${id}/question/${questionId}/edit`}
                  className={classes.link}
                >
                  <Chip
                    label="Edit or Delete Questions and Answers"
                    color="primary"
                    aria-label="Edit or Delete Questions and Answers"
                    className={classes.cursor}
                  />
                </Link>
              </div>
            )}
          </div>
        </Grid>

        <Grid item xs={2} md={2}>
          <img
            aria-label="quiz image"
            src={quizImage}
            alt="Quiz"
            className={classes.quizImage}
          />
        </Grid>
      </Grid>

      {expanded && (
        <List aria-label="answers" className={classes.answersWrapper}>
          {answers.map((answer) => (
            <ListItem key={answer.id} className={classes.answersContainer}>
              <ListItemText aria-label="answer text" className={classes.answer}>
                {answer.text}
              </ListItemText>

              <ListItemText
                aria-label="answer correct or not"
                className={classes.answerStatus}
              >
                {answer.isCorrect ? (
                  <MdDone className={classes.correctAnswer} />
                ) : (
                  <MdClear className={classes.incorrectAnswer} />
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </main>
  );
};

QuestionItem.propTypes = {
  questionId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  countdown: PropTypes.number,
  points: PropTypes.number,
  youtube: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.object),
};

QuestionItem.defaultProps = {
  answers: [],
  image: '',
  countdown: 0,
  points: 0,
  youtube: '',
};

export default QuestionItem;
