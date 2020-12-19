/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import QuizListItem from '../QuizListItem';
import Utilities from '../../../../../dataLayer';
import { baseURL } from '../../../../../constants';
import useStyles from './styles';
import FallBackImage from '../../../../../assets/unavailable.png';
import NoQuiz from '../NoQuiz';

const QuizzesList = (() => {
  const api = new Utilities(baseURL);
  const [data, setData] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    api.getQuizzes()
      .then((response) => setData(response));
  }, []);

  const { quizzes } = data;

  return (
    <main className={classes.root}>
      { quizzes && quizzes.length ? quizzes.map((q) => {
        const fallBackImage = q.thumbnail === null ? FallBackImage : q.thumbnail;

        return (
          <QuizListItem
            id={q.id}
            name={q.name}
            thumbnail={fallBackImage}
            key={q.id}
            createdAt={q.createdAt}
            owner={q.owner}
            questions={q.questions}
          />
        );
      }) : <NoQuiz /> }
    </main>
  );
});

export default QuizzesList;
