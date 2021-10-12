import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ListIcon from '@material-ui/icons/List';
import Chip from '@material-ui/core/Chip';
import QuestionItem from '../QuestionItem';
import FallBackImage from '../../../../../assets/unavailable.png';
import NoQuestion from '../NoQuestion';

import useStyles from './styles';

const QuizItem = ((
  {
    name,
    thumbnail,
    active,
    questions,
    triggerModal,
  },
) => {
  const classes = useStyles();

  const quizImage = thumbnail === null ? FallBackImage : thumbnail;

  const handleClick = (e) => {
    e.preventDefault();

    triggerModal();
  };

  return (
    <main>
      <Grid container>
        <Grid item xs={12} md={3} className={classes.profileSection}>
          <img src={quizImage} alt="quiz" className={classes.quizImage} />
          <div className={classes.quizInfoSection}>
            <div className={classes.displayFlex}>
              <div className={classes.quizName}>
                {name}
              </div>

              <div className={classes.chip}>
                <Chip
                  label={active ? 'Active' : 'Inactive'}
                  color={active ? 'primary' : 'secondary'}
                  variant="outlined"
                />
              </div>
            </div>

            <Button variant="contained" color="primary" onClick={handleClick}>
              Edit
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} md={9} className={classes.questionSection}>
          <h1 className={classes.topSpacing}>
            Questions
            {' '}
            <Badge badgeContent={questions.length} color="primary">
              <ListIcon />
            </Badge>
          </h1>
          {questions.map((question) => (
            <QuestionItem
              questionId={question.id}
              image={question.image}
              countdown={question.countdown}
              points={question.points}
              youtube={question.youtube}
              text={question.text}
              answers={question.answers}
            />
          ))}

          {!questions.length && <NoQuestion />}
        </Grid>
      </Grid>
    </main>
  );
});

QuizItem.propTypes = {
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  active: PropTypes.bool,
  questions: PropTypes.arrayOf(PropTypes.object),
  triggerModal: PropTypes.func.isRequired,
};

QuizItem.defaultProps = {
  questions: [],
  active: false,
};

export default QuizItem;
