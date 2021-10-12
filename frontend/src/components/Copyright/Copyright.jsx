import React from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    BigBrain Pty Ltd
    {` ${new Date().getFullYear()}`}
  </Typography>
);

export default Copyright;
