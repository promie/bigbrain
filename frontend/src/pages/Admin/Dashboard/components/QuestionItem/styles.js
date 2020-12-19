import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#e6e9f7',
    height: '165px',
    margin: '15px 0px',
    borderRadius: '10px',
  },
  quizImage: {
    width: '50px',
    height: '50px',
    [theme.breakpoints.up('md')]: {
      width: '180px',
      height: '160px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '218px',
      height: '165px',
    },
  },
  questionTitle: {
    fontSize: '12px',
    flexGrow: 5,
    paddingLeft: '30px',
    display: 'flex',
    alignItems: 'center',
    height: '150px',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '30px',
    },
  },
  questionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('xl')]: {
      flexDirection: 'row',
    },
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '30px',
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  cursor: {
    cursor: 'pointer',
  },
  questionSection: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ced3ed',
      borderRadius: '10px',
    },
  },
  answersWrapper: {
    backgroundColor: '#fff',
    marginTop: '-5px',
    borderRadius: '10x',
    padding: '15px',
  },
  answersContainer: {
    display: 'flex',
    border: '1px solid #F0F0F0',
  },
  answer: {
    width: '90%',
  },
  correctAnswer: {
    fontSize: '23px',
    color: '#468629',
  },
  incorrectAnswer: {
    fontSize: '23px',
    color: '#D33F4B',
  },
  countdownText: {
    fontSize: '10px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('xl')]: {
      flexDirection: 'row',
    },
  },
  pointsText: {
    fontSize: '10px',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  hideContent: {
    display: 'none',
  },
}));

export default useStyles;
