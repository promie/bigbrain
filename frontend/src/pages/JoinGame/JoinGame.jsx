import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles';
import Logo from '../../assets/logo.png';
import Utilities from '../../dataLayer';
import { baseURL } from '../../constants';

const JoinGame = () => {
  const { id } = useParams();

  const initialState = {
    name: '',
    sessionId: id || '',
  };

  const [data, setData] = useState(initialState);
  const [notificationError, setNotificationError] = useState(false);
  const [notificationErrorMessage, setNotificationErrorMessage] = useState('');

  const api = new Utilities(baseURL);

  const classes = useStyles();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, sessionId } = data;

    setTimeout(() => {
      api
        .joinSession(name, sessionId)
        .then((result) => {
          const { playerId } = result;

          navigate(`/join/${id}/start/${playerId}`);
        })
        .catch((error) => {
          error.json().then((err) => {
            setNotificationError(true);
            setNotificationErrorMessage(err.error);
          });
        });
    }, 2000);
  };

  return (
    <main className={classes.wrapper}>
      <div className={classes.joinGameSection}>
        <div className={classes.gamePIN}>
          <div className={classes.logoSection}>
            <img src={Logo} alt="big brain logo" className={classes.logo} />
          </div>

          <div className={classes.formSection}>
            <div className={classes.joinGameSessionText}>Join Game Session</div>
            {notificationError && (
              <Alert variant="outlined" severity="error" className={classes.alert}>
                {notificationErrorMessage}
              </Alert>
            )}
            <form className={classes.root}>
              <TextField required id="sessionId" name="sessionId" label="Game PIN" value={data.sessionId} variant="outlined" onChange={handleChange} />
              <TextField required id="name" name="name" label="Your Name" value={data.name} variant="outlined" onChange={handleChange} />
              <Button variant="contained" color="primary" onClick={handleSubmit}>JOIN</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JoinGame;
