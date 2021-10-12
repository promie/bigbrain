/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Copyright from '../../components/Copyright';
import { validateEmail } from '../../helpers';
import Utilities from '../../dataLayer';
import {
  loginInitialState,
  loginInitialErrorState,
  baseURL,
} from '../../constants';

const Login = () => {
  const [data, setData] = useState(loginInitialState);
  const [errors, setErrors] = useState(loginInitialErrorState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationError, setNotificationError] = useState(false);
  const [notificationErrorMessage, setNotificationErrorMessage] = useState('');

  const navigate = useNavigate();

  const api = new Utilities(baseURL);

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: {
        error: false,
        message: '',
      },
    });

    if (value === '') {
      setErrors({
        ...errors,
        [name]: {
          error: true,
          message: 'Please ensure that the form is filled out',
        },
      });
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({
          ...errors,
          [name]: {
            error: true,
            message: 'Please enter a valid email',
          },
        });
      }
    }

    if (
      data.email !== '' &&
      data.password !== '' &&
      validateEmail(data.email)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;
    setLoading(true);

    setTimeout(() => {
      api
        .adminLogin(email, password)
        .then(() => {
          setLoading(false);
          setData(loginInitialState);
          navigate('/dashboard');
        })
        .catch((error) => {
          error.json().then((err) => {
            setLoading(false);
            setNotificationError(true);
            setNotificationErrorMessage(err.error);
          });
        });
    }, 2000);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            {notificationError && (
              <Alert variant="outlined" severity="error">
                {notificationErrorMessage}
              </Alert>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={errors.email.error}
              helperText={errors.email.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              error={errors.password.error}
              helperText={errors.password.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
            >
              {loading && <CircularProgress size={28} />}
              {!loading && 'Log In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" className={classes.removeUnderline}>
                  Don`t have an account? Register
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
