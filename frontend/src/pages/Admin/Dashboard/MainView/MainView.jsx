import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from './styles';
import Logo from '../../../../assets/logo.png';
import Create from '../../../../assets/create.jpg';
import Host from '../../../../assets/host.png';
import Play from '../../../../assets/play.png';

const MainView = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  }, []);

  const cardContent = [
    {
      id: 1,
      image: Create,
      title: 'Create Quiz',
      description:
        'It only takes a minute to create a learning game or trivia quiz on any topic. Head over to the quizzes page now.',
    },
    {
      id: 2,
      image: Host,
      title: 'Host or Share',
      description:
        'Host a live game with questions on a big screen or share a game with remote players.',
    },
    {
      id: 3,
      image: Play,
      title: 'Play',
      description:
        'Game on! Join a BigBrain provided by the host and answer questions on your device.',
    },
  ];

  return (
    <main className={classes.main}>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Typography className={classes.alignRight}>
          Welcome,
          {' '}
          {email}
        </Typography>
      </Box>
      <Grid container>
        <Grid item md={3} xs={12} className={classes.logoSection}>
          <img src={Logo} alt="Big Brain Logo" className={classes.logo} />
        </Grid>

        <Grid item md={9} xs={12} className={classes.howToSection}>
          <div>
            <Typography aria-label="Get Started" variant="h4" className={classes.getStarted}>
              Get Started
            </Typography>
          </div>

          <Grid container className={classes.cardContent}>
            {cardContent.map((content) => (
              <Grid
                item
                md={3}
                xs={12}
                className={classes.root}
                key={content.id}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      aria-label="Title and Image"
                      className={classes.media}
                      image={content.image}
                      title={content.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h5" className={classes.contentTitle}>
                        {content.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.contentDescription}
                      >
                        {content.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display={{ xs: 'none', md: 'block' }} className={classes.moveDown}>
            <Typography aria-label="About BigBrain" className={classes.history}>
              BigBrain was founded in 2020
              in a project for assignment 3 for COMP6080 at the
              University of New South Wales. BigBrain is an innovative
              lightweight quiz platform for millenials that will revolutionise
              the secondary and tertiary education market for years.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
};

export default MainView;
