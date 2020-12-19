/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Outlet, useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { baseURL } from '../../../constants';
import Utilities from '../../../dataLayer';
import useStyles from './styles';
import NavigationList from './components/NavigationList';
import { getInitialFromLoggedInUser } from '../../../helpers';

const Dashboard = () => {
  const api = new Utilities(baseURL);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('PY');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isLoggedIn()) {
      navigate('/login');
    }
    setEmail(localStorage.getItem('email'));
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Box display={{ xs: 'none', md: 'block' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            BigBrain
          </Typography>
          <Tooltip title={email} aria-label="logged in users email">
            <Avatar className={classes.orange}>{ getInitialFromLoggedInUser(email)}</Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <NavigationList primary />
        <Divider />
        <div className={classes.stickToBottom}>
          <NavigationList primary={false} />
        </div>

        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
