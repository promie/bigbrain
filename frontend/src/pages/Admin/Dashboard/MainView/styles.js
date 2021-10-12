import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '150px',
    height: '150px',
    [theme.breakpoints.up('md')]: {
      width: '250px',
      height: '250px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '400px',
      height: '400px',
    },
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howToSection: {
    textAlign: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#e6e9f7',
      padding: '15px 30px',
      borderRadius: '10px',
    },
    [theme.breakpoints.up('xl')]: {
      backgroundColor: '#e6e9f7',
    },
  },
  card: {
    width: 250,
    maxWidth: 250,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      width: 240,
      maxWidth: 240,
    },
    [theme.breakpoints.up('xl')]: {
      width: 350,
      maxWidth: 350,
    },
  },
  media: {
    height: 140,
  },
  history: {
    textAlign: 'left',
    backgroundColor: '#fff',
    color: '#3748A7',
    padding: '10px',
    borderRadius: '10px',
    border: '2px solid #3748A7',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '16px',
    },
  },
  getStarted: {
    textAlign: 'left',
    margin: '15px 0px',
    fontSize: '16px',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
      fontSize: '25px',
    },
    [theme.breakpoints.up('xl')]: {
      textAlign: 'center',
      fontSize: '25px',
    },
  },
  moveDown: {
    paddingTop: '40px',
  },
  alignRight: {
    textAlign: 'right',
    marginBottom: '2px',
  },
  root: {
    margin: '5px 0px',
    [theme.breakpoints.up('md')]: {
      margin: '5px 20px',
    },
    [theme.breakpoints.up('xl')]: {
      margin: '5px 35px',
    },
  },
  cardContent: {
    justifyContent: 'center',
  },
  main: {
    [theme.breakpoints.up('md')]: {
      marginTop: '2%',
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: '5%',
    },
  },
  contentTitle: {
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '18px',
    },
  },
  contentDescription: {
    fontSize: '10px',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '16px',
    },
  },
}));

export default useStyles;
