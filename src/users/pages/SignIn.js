import React from 'react';
import SignInBox from '../components/SignInBox';

import { Paper } from '@mui/material';

const SignIn = () => {
  return (
    <Paper sx={{ mt: 5, maxWidth: '600px', mx: 'auto' }}>
      <SignInBox />
    </Paper>
  );
};

export default SignIn;
