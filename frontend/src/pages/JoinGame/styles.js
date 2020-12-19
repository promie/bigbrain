import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  joinGameSection: {
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
    width: '350px',
  },
  gamePIN: {
    backgroundColor: '#fff',
    width: '1000px',
    borderRadius: '10px',
    padding: '50px',
    display: 'flex',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
  logoSection: {
    width: '50%',
  },
  formSection: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: '8px',
  },
  joinGameSessionText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  alert: {
    margin: '5px 0 10px 0',
  },
}));

export default useStyles;
