import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: ''
};

const formValidations = {
  email: [(value) => value.includes('@'), 'The email must contain an "@"'],
  password: [
    (value) => value.length > 5,
    'The password must be longer than 5 characters'
  ],
  displayName: [
    (value) => value.length > 0,
    'The name must be longer than 5 characters'
  ]
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Complete Name"
              type="text"
              placeholder="Your Full Name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={Boolean(displayNameValid) && formSubmitted}
              helperText={
                !(Boolean(displayNameValid) && formSubmitted)
                  ? ''
                  : displayNameValid
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@domain.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={Boolean(emailValid) && formSubmitted}
              helperText={
                !(Boolean(emailValid) && formSubmitted) ? '' : emailValid
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              autoComplete="username"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={Boolean(passwordValid) && formSubmitted}
              helperText={
                !(Boolean(passwordValid) && formSubmitted) ? '' : passwordValid
              }
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              display={Boolean(errorMessage) ? 'block' : 'none'}
            >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>
              Do you already have an account?
            </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
