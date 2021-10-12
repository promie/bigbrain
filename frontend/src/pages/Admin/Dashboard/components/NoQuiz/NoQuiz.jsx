import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import NoQuizImage from '../../../../../assets/noquiz.jpg';

const NoQuiz = () => {
  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <div>
        <img src={NoQuizImage} alt="no quiz" className={classes.noQuizImage} />
        <Typography className={classes.title}>No quizzes yet</Typography>
        <Typography className={classes.subTitle}>Create one now!</Typography>
      </div>
    </main>
  );
};

export default NoQuiz;
