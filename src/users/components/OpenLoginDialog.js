import { Dialog } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SignInBox from './SignInBox';

const OpenLoginDialog = ({ open, onClose, redirect }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <SignInBox redirect={redirect} />
      </Box>
    </Dialog>
  );
};

export default OpenLoginDialog;
