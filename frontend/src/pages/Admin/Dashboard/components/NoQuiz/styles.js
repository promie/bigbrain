import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: '#e6e9f7',
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '10px',
    padding: '30px',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '490px',
    },
    [theme.breakpoints.up('xl')]: {
      height: '620px',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuizImage: {
    width: '150px',
    [theme.breakpoints.up('md')]: {
      width: '250px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '400px',
    },
  },
  title: {
    fontSize: '20px',
    [theme.breakpoints.up('md')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '38px',
    },
  },
  subTitle: {
    fontSize: '16px',
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
}));
export default useStyles;
