import { Box, Button, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch } from 'app/hooks';
import { loginRequest } from '../authSlice';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFrow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: '24px',
  },
});

export default function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      loginRequest({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
