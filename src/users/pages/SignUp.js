import React from 'react';
import SignUpBox from '../components/SignUpBox';

import { Paper } from '@mui/material';

const SignUp = () => {
  return (
    <Paper sx={{ mt: 5, maxWidth: '600px', mx: 'auto' }}>
      <SignUpBox />
    </Paper>
  );
};

export default SignUp;
