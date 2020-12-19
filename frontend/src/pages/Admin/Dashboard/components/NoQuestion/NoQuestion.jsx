import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './styles';
import NoQuestionImage from '../../../../../assets/noquiz.jpg';

const NoQuestion = () => {
  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <div>
        <img src={NoQuestionImage} alt="no quiz" className={classes.noQuestionImage} />
        <Typography className={classes.title}>No questions yet</Typography>
        <Typography className={classes.subTitle}>Create one now!</Typography>
      </div>
    </main>
  );
};

export default NoQuestion;
