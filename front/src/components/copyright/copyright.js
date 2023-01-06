import React from 'react';

import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const Copyright = () => {
  return (
    <Typography style={{ padding: '30px' }} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://www.fantium.com">
        www.fantium.com
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
