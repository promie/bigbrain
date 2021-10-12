import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  playGameSection: {
    backgroundColor: '#314099',
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '250px',
  },
  gamePIN: {
    backgroundColor: '#fff',
    width: '1000px',
    borderRadius: '10px',
    padding: '50px',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  welcomePlayer: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: '10px',
  },
  tabPanel: {
    textAlign: 'left',
    backgroundColor: '#DDE2F2',
  },
  questionWrapper: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '20px',
  },
  questionText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '30px',
    marginBottom: '25px',
    marginTop: '5px',
    backgroundColor: '#F0F0F0',
    padding: '30px',
  },
  questionImage: {
    width: '400px',
    borderRadius: '10px',
  },
  answersList: {
    display: 'flex',
  },
  headerWrapper: {
    display: 'flex',
  },
  question: {
    flexGrow: 1,
  },
  timer: {
    flexGrow: 1,
    display: 'flex',
  },
  points: {
    flexGrow: 1,
    display: 'flex',
  },
  icon: {
    fontSize: '23px',
  },
  fieldSet: {
    flexGrow: 5,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  thumbnailQuestion: {
    flexGrow: 1,
  },
  hideContent: {
    display: 'none',
  },
  submitBtn: {
    textAlign: 'right',
    marginTop: '20px',
  },
  btn: {
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  yourAnswerPanel: {
    backgroundColor: '#D8DEEF',
    textAlign: 'right',
    marginTop: '20px',
    padding: '10px 10px 10px 0',
  },
}));

export default useStyles;
