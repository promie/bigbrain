import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import { Link, useNavigate } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsports from '@material-ui/icons/SportsEsports';
import HomeIcon from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import Utilities from '../../../../../dataLayer';
import { baseURL } from '../../../../../constants';

const NavigationList = ({ primary }) => {
  const [isHomePage, setHomePage] = useState(null);
  const [isQuizzesPage, setQuizzesPage] = useState(null);

  const api = new Utilities(baseURL);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === '/'
      || window.location.pathname === '/dashboard'
    ) {
      setHomePage(true);
    } else {
      setHomePage(false);
    }

    if (window.location.pathname === '/dashboard/quizzes') {
      setQuizzesPage(true);
    } else {
      setQuizzesPage(false);
    }
  }, [isHomePage, isQuizzesPage]);

  const setHomePageActive = () => {
    setHomePage(true);
    setQuizzesPage(false);
  };

  const setQuizzesPageActive = () => {
    setQuizzesPage(true);
    setHomePage(false);
  };

  const logout = () => {
    if (api.isLoggedIn()) {
      api.adminLogout().then(() => {
        navigate('/login');
      });
    }
  };

  const displayLinks = primary ? (
    <>
      <Link
        to="/dashboard"
        style={{ textDecoration: 'none', color: '#000' }}
      >
        <ListItem button selected={isHomePage} onClick={setHomePageActive}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
      <Link
        to="/dashboard/quizzes"
        style={{
          textDecoration: 'none',
          color: '#000',
        }}
      >
        <ListItem
          button
          selected={isQuizzesPage}
          onClick={setQuizzesPageActive}
        >
          <ListItemIcon>
            <SportsEsports />
          </ListItemIcon>
          <ListItemText primary="Quizzes" />
        </ListItem>
      </Link>
    </>
  ) : (
    <ListItem
      button
      onClick={logout}
    >
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );

  return (
    <List>
      {displayLinks}
    </List>
  );
};

NavigationList.propTypes = {
  primary: PropTypes.bool.isRequired,
};

export default NavigationList;
