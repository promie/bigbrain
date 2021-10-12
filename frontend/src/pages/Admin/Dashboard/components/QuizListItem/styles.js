import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    maxWidth: 345,
    margin: '20px 0px',
    [theme.breakpoints.up('md')]: {
      margin: '20px 20px 20px 0px',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  modalDescription: {
    fontSize: '16px',
    padding: '20px 0',
  },
  cancelBtn: {
    marginRight: '5px',
  },
  game: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: 1000,
    },
    display: 'flex',
  },
  logo: {
    width: '300px',
  },
  questionSection: {
    width: '100%',
    backgroundColor: '#3748A7',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
  },
  gameThumbnailSection: {
    display: 'flex',
  },
  quizImage: {
    width: '300px',
    border: '2px solid #fff',
  },
  quizInfo: {
    width: '100%',
    height: '150px',
    backgroundColor: '#fff',
    marginTop: '25px',
    marginLeft: '-10px',
    textAlign: 'left',
    padding: '30px',
    borderRadius: '10px',
  },
  quizImageSection: {
    position: 'relative',
  },
  quizName: {
    fontSize: '30px',
  },
  questionsNumber: {
    marginTop: 'auto',
    backgroundColor: '#E2E6F5',
    padding: '10px',
  },
  sessionIDSection: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: '40px',
    padding: '20px',
  },
  joinGameText: {
    fontSize: '20px',
  },
  quizTitle: {
    color: '#3748A7',
  },
  sessionID: {
    fontSize: '45px',
    cursor: 'pointer',
  },
  copied: {
    color: '#FF3034',
  },
  endSessionBtn: {
    marginTop: '20px',
    textAlign: 'left',
  },
  displayArea: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
  },
  yesButton: {
    marginRight: '5px',
  },
  startQuizBtn: {
    marginTop: '10px',
  },
  headerWrapper: {
    display: 'flex',
  },
  question: {
    flexGrow: 1,
    textAlign: 'left',
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
  questionText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '30px',
    marginBottom: '25px',
    marginTop: '5px',
    backgroundColor: '#F0F0F0',
    padding: '30px',
  },
  answersList: {
    display: 'flex',
  },
  thumbnailQuestion: {
    flexGrow: 1,
  },
  questionImage: {
    width: '400px',
    borderRadius: '10px',
  },
  fieldSet: {
    flexGrow: 5,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  answersWrapper: {
    backgroundColor: '#fff',
    marginTop: '-5px',
    borderRadius: '10x',
    padding: '15px',
    width: '100%',
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
  buttonGroup: {
    display: 'flex',
    marginTop: '10px',
  },
  resultsBtn: {
    flexGrow: '1',
    textAlign: 'left',
  },
  nextQuestionBtn: {
    flexGrow: '1',
    textAlign: 'right',
  },
  showResultsSection: {
    display: 'flex',
  },
  quizResultInfo: {
    flexGrow: '1',
  },
  endSessionBtnGroup: {
    flexGrow: '1',
  },
  sessionBtn: {
    width: '250px',
    margin: '5px 0px',
  },

}));
export default useStyles;
