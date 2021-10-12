import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    height: '240px',
    backgroundColor: '#e6e9f7',
    textAlign: 'center',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
  },
  noQuestionImage: {
    width: '150px',
  },
  title: {
    fontSize: '20px',
  },
  subTitle: {
    fontSize: '16px',
  },
}));

export default useStyles;
