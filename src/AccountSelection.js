import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Account.css';


const AccountSelection = () => {
  const navigate = useNavigate();

  const handlePersonalAccountClick = () => {
    navigate('/signup'); // Navigates to <SignUp />
  };

  const handleAgencyAccountClick = () => {
    navigate('/asignup'); // Navigates to <ASignUp />
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >   
    <Typography variant='h1'> My App</Typography>
      <Typography variant="h4" gutterBottom>
        Select Account Type
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ margin: 2, width: '200px' }}
        onClick={handlePersonalAccountClick}
      >
        Personal Account
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ margin: 2, width: '200px' }}
        onClick={handleAgencyAccountClick}
      >
        Agency Account
      </Button>
    </Box>
  );
};

export default AccountSelection;
