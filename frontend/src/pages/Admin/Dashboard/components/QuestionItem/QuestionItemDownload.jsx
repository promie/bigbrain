import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { MdDone, MdClear } from 'react-icons/md';
import useStyles from './styles';
import FallBackImage from '../../../../../assets/unavailable.png';

const QuestionItemDownload = (
  {
    text,
    image,
    countdown,
    points,
    answers,
  },
) => {
  const classes = useStyles();

  const quizImage = image === null ? FallBackImage : image;
  const [expanded, setExpanded] = useState(false);

  const toggleAnswer = () => {
    setExpanded(!expanded);
  };

  if (!text) return null;

  return (
    <main>
      <Grid container className={classes.container}>
        <Grid item xs={10} md={10} onClick={toggleAnswer} className={classes.questionSection}>
          <div className={classes.questionWrapper}>
            <div className={classes.questionTitle}>
              {text}
            </div>
            <div>
              {`Countdown time (s) = ${countdown}`}
            </div>
            <div>
              {`Points = ${points}`}
            </div>
          </div>

        </Grid>
        <Grid item xs={2} md={2}>
          <img src={quizImage} alt="Quiz" className={classes.quizImage} />
        </Grid>
      </Grid>

      {expanded && (
      <List className={classes.answersWrapper}>
        {answers.map((answer) => (
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

      // <List>
      //   {answers.map((answer) => (
      //     <ListItem button key={answer.id}>
      //       <ListItemText primary={answer.id} />
      //       <ListItemText primary={answer.text} />
      //       { answer.isCorrect && <ListItemText primary="Correct Answer!" />}
      //       { !answer.isCorrect && <ListItemText primary="Wrong Answer!" />}
      //     </ListItem>
      //   ))}
      // </List>
      )}

      {/* <p>{questionId}</p> */}
      {/* {image !== '' ? <img alt={text} src={image} width="200px" /> : 'no image' } */}
      {/* {youtube !== '' ? <iframe title="youtube" width="420" height="315"
      src={youtube} /> : 'no youtube' } */}

    </main>
  );
};

QuestionItemDownload.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  countdown: PropTypes.number,
  points: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.object),
};

QuestionItemDownload.defaultProps = {
  answers: [],
  image: '',
  countdown: 0,
  points: 0,
};

export default QuestionItemDownload;
