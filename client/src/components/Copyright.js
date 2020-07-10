import React from 'react';

// Material-ui components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/armstrongq22/CookBook">
          CookBook
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
};

export default Copyright;