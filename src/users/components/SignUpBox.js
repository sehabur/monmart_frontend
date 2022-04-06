import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';

import { backEndServer } from '../../constants/common';
import Spinner from '../../shared/components/Spinner';

const SignUpBox = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.data && auth.data.isLoggedIn) {
      navigate('/');
    }
  }, [auth.data, navigate]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        `${backEndServer}/api/users/register`,
        formData
      );
      if (response.status === 200) {
        setSuccess(true);
        setErrorMessage(null);
      }
    } catch (error) {
      setSuccess(false);

      if (error.response) {
        let composeMsg;
        if (error.response.data.message) {
          composeMsg = error.response.data.message;
        } else if (error.response.data.errors) {
          composeMsg = error.response.data.errors[0].msg;
        }
        setErrorMessage(`User creation failed. ${composeMsg}`);
        console.dir(error.response);
      }
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Spinner open={isLoading} />
      <Box
        sx={{
          maxWidth: '33rem',
          m: 'auto',
          py: 4,
          px: 8,
          bgcolor: 'common.white',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              We have sent an email to the mail address you registered. Please
              verify.
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{ minLength: 6 }}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin">
                <Typography>Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignUpBox;
