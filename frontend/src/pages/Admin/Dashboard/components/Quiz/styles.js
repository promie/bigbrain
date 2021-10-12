import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  questionSection: {
    padding: '5px 30px 30px 30px',
    backgroundColor: '#F2F2F2',

  },
  quizImage: {
    width: '100%',
    height: '200px',
  },
  quizInfoSection: {
    padding: '10px',
  },
  topSpacing: {
    marginTop: '10px',
    color: '#3748A7',
  },
  displayFlex: {
    display: 'flex',
    marginBottom: '10px',
  },
  chip: {
    textAlign: 'right',
    justifyContent: 'right',
    flexGrow: 1,
  },
  quizName: {
    flexGrow: 5,
    fontSize: '20px',
  },
}));

export default useStyles;
