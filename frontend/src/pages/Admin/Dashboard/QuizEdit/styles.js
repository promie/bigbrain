import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newQuestionModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  quizImage: {
    width: '150px',
  },
  center: {
    textAlign: 'center',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      // backgroundColor: 'red',
    },
  },
  thumbnail: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
  },
  imageUpload: {
    display: 'flex',
  },
  imageUploadLabel: {
    width: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  addQuestionBtn: {
    marginBottom: '10px',
    textAlign: 'right',
  },
  hideContent: {
    display: 'none',
  },
  newQuestionUploadLabel: {
    marginLeft: '15px',
  },
  mainQuestion: {
    fontSize: '120px !important',
  },
  mediaUpload: {
    display: 'flex',
  },
  qaWrapper: {
    display: 'flex',
  },
  editQuestionSection: {
    // backgroundColor: 'red',
    width: '50%',
    padding: '30px',
  },
  addAnswerSection: {
    // backgroundColor: 'blue',
    width: '50%',
    padding: '30px',
  },
  addAnswerText: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#3748A7',
  },
  buttonLike: {
    backgroundColor: '#3748A7',
    border: 'none',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  correctAnswerCheckbox: {
    marginTop: '-10px',
    marginLeft: '-2px',
  },
  answersContainer: {
    display: 'flex',
  },
  answer: {
    width: '50%',
  },
  status: {
    width: '50%',
    textAlign: 'center',
  },
  removeBtnLike: {
    backgroundColor: '#FF3034',
    border: 'none',
    color: '#fff',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  correctAnswer: {
    fontSize: '23px',
    color: '#468629',
  },
  incorrectAnswer: {
    fontSize: '23px',
    color: '#D33F4B',
  },
  listAnswers: {
    color: '#3748A7',
    fontSize: '22px',
  },
  actionBtnGroup: {
    marginTop: '10px',
  },
  primaryButtonLike: {
    backgroundColor: '#3748A7',
    border: 'none',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    marginRight: '5px',
  },
  secondaryButtonLike: {
    backgroundColor: '#FF3034',
    border: 'none',
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    marginRight: '5px',
  },
  questionImage: {
    width: '100%',
    height: '250px',
    borderRadius: '10px',
  },
  youtubeInput: {
    width: '100%',
  },
  imageUploadSection: {
    textAlign: 'center',
    width: '50%',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtubeSection: {
    width: '50%',
    padding: '5px',
  },
}));

export default useStyles;
