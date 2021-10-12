import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: '0px',
    },
  },
  moveRight: {
    textAlign: 'left',
    marginLeft: '0px',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  spacer: {
    marginBottom: '5px;',
  },
  quizImage: {
    width: '150px',
  },
  center: {
    textAlign: 'center',
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up('xl')]: {
      flexDirection: 'row',
    },
  },
  btnGroupOne: {
    flexGrow: 5,
  },
  btnGroupTwo: {
    flexGrow: 1,
  },
  createQuizBtn: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'auto',
    },
    margin: '5px 0px',
  },
  jsonBtn: {
    marginRight: '10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'auto',
    },
    margin: '5px 0px',
  },
  suggestionBtn: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'auto',
    },
    margin: '5px 0px',
  },
}));

export default useStyles;
