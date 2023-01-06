import React from 'react';

import Typography from '@material-ui/core/Typography';

import Login from 'modules/login';

export default function Index() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Fantium
      </Typography>
      <Login/>
    </div>
  );
}
