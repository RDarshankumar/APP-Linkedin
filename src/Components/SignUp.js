import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Navbar from './Navbar'; // Import Navbar component
import './SignUp.css';


function SignUp() {
    const [userData, setUserData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    const validate = () => {
        const newErrors = {};
        if (!userData.firstName) newErrors.firstName = "First Name is required";
        if (!userData.username) newErrors.username = "Username is required";
        if (!userData.email) newErrors.email = "Email is required";
        if (!userData.password) newErrors.password = "Password is required";
        if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSignUp = () => {
        if (!validate()) return;

        localStorage.setItem(userData.username, JSON.stringify(userData));
        setOpenPopup(true); // Show popup after successful sign-up
    };

    const handlePopupClose = () => {
        setOpenPopup(false);
        setShowSignIn(true); // Show the SignIn form after closing the popup
    };

    const handleLogin = (loginData) => {
        const storedUser = JSON.parse(localStorage.getItem(loginData.username));
        if (storedUser && storedUser.password === loginData.password) {
            setIsLoggedIn(true); // Set login status to true
        } else {
            alert("Incorrect username or password!");
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <Navbar /> // Show Navbar when logged in
            ) : (
                <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    {!showSignIn ? (
                        <Box>
                            <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>
                            <Box>
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                />
                                <TextField
                                    name="username"
                                    label="Username"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                                <TextField
                                    name="email"
                                    label="Email"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                                <TextField
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                                <Button variant="contained" color="primary" fullWidth onClick={handleSignUp} sx={{ marginTop: 2 }}>Sign Up</Button>
                            </Box>
                            <Dialog open={openPopup} onClose={handlePopupClose}>
                                <DialogTitle>Account Created</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Your account has been created successfully!</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handlePopupClose} color="primary">OK</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    ) : (
                        <SignIn handleLogin={handleLogin} />
                    )}
                </Container>
            )}
        </>
    );
}

function SignIn({ handleLogin }) {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!loginData.username) newErrors.username = "Username is required";
        if (!loginData.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginClick = () => {
        if (!validate()) return;
        handleLogin(loginData);
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box>
                <Typography variant="h4" gutterBottom align="center">Sign In</Typography>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLoginClick} sx={{ marginTop: 2 }}>Login</Button>
            </Box>
        </Container>
    );
}

export default SignUp;
