import { Box, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { backEndServer } from '../../constants/common';

const EmailVerification = () => {
  const [success, setSuccess] = useState(false);
  const params = useParams();

  useEffect(() => {
    getEmailVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEmailVerification = async () => {
    try {
      const response = await axios.get(
        `${backEndServer}/api/users/emailVerification/${params.id}`
      );
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        maxWidth: '50vw',
        mx: 'auto',
        my: 5,
        p: 3,
        textAlign: 'center',
      }}
    >
      {success ? (
        <Typography>
          Email verification successful. Please{' '}
          <Link component={RouterLink} to="/signin">
            Login
          </Link>{' '}
          to expolre more!
        </Typography>
      ) : (
        <Typography>
          Email verification failed.{' '}
          <Link href={`/email_verification/user/${params.id}`}>Retry</Link>
        </Typography>
      )}
    </Box>
  );
};

export default EmailVerification;
