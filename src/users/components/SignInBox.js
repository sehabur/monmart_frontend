import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert, FormGroup } from '@mui/material';

import { backEndServer } from '../../constants/common';
import { authActions } from '../../store';
import Spinner from '../../shared/components/Spinner';

const SignInBox = ({ redirect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: null,
    password: null,
    rememberMe: false,
  });

  const redirection = redirect ? redirect : '/';

  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.data && auth.data.isLoggedIn) {
      navigate(redirection);
    }
  }, [auth.data, navigate, redirection]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        `${backEndServer}/api/users/login`,
        formData
      );
      if (response.status === 200) {
        const userInfo = {
          ...response.data.user,
          isLoggedIn: true,
        };
        dispatch(authActions.login(userInfo));
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate(redirection);
      }
    } catch (error) {
      setErrorMessage(
        `Login Failed. ${error.response ? error.response.data.message : null}`
      );
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.name === 'rememberMe'
          ? event.target.checked
          : event.target.value,
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            type="email"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              checked={formData.rememberMe}
              name="rememberMe"
              color="primary"
              onChange={handleInputChange}
            />
          </FormGroup>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="#">
                <Typography>Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup">
                <Typography>Don't have an account? Sign Up</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignInBox;
