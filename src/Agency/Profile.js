import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Profile = ({ onProfileImageChange }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [banner, setBanner] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [aboutEditable, setAboutEditable] = useState(false);
  const [detailsEditable, setDetailsEditable] = useState(false);

  // Load profile data from local storage
  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
      setBanner(profileData.banner || '');
      setProfileImage(profileData.profileImage || '');
      setDescription(profileData.description || '');
      setCity(profileData.city || '');
      setCountry(profileData.country || '');
      setPhone(profileData.phone || '');
      setEmail(profileData.email || '');
      setName(profileData.name || '');
      setUsername(profileData.username || '');
    }
  }, []);

  // Save data to local storage
  const saveToLocalStorage = () => {
    const profileData = {
      banner,
      profileImage,
      description,
      city,
      country,
      phone,
      email,
      name,
      username,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  // Profile Image Handling
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Save base64 image
        onProfileImageChange(reader.result);
        const updatedProfileData = JSON.parse(localStorage.getItem('profileData')) || {};
        updatedProfileData.profileImage = reader.result;
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData)); // Save updated profile image to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner Image Handling
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result); // Save base64 banner
        const updatedProfileData = JSON.parse(localStorage.getItem('profileData')) || {};
        updatedProfileData.banner = reader.result;
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData)); // Save updated banner to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAbout = () => {
    setAboutEditable(false);
    saveToLocalStorage();
  };

  const handleEditAbout = () => {
    setAboutEditable(true);
  };

  const handleSaveDetails = () => {
    setDetailsEditable(false);
    saveToLocalStorage();
  };

  const handleEditDetails = () => {
    setDetailsEditable(true);
  };

  const LogoutDialog = () => (
    <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogoutCancel} color="primary">No</Button>
        <Button onClick={handleLogoutConfirm} color="primary">Yes</Button>
      </DialogActions>
    </Dialog>
  );

  const handleLogout = () => {
   
  
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('profileData');
    window.location.reload(); // To redirect to the login or home page
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Box p={3}>
      {/* Banner Section */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <img src={banner || 'default-banner.jpg'} alt="Banner" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <input type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} id="banner-upload" />
        <label htmlFor="banner-upload">
          <Button variant="contained" component="span">Change Banner</Button>
        </label>
      </Box>

      {/* Profile Image Section */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <img src={profileImage || 'default-profile.jpg'} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} id="profile-image-upload" />
        <label htmlFor="profile-image-upload">
          <Button variant="contained" component="span">Change Profile Image</Button>
        </label>
      </Box>

      {/* Details Section */}
      <Box mb={2}>
        <Typography variant="h6">Details</Typography>
        <TextField
          label="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!detailsEditable}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!detailsEditable}
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!detailsEditable}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!detailsEditable}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          margin="normal"
          disabled={!detailsEditable}
        />
        <Box mt={2}>
          {detailsEditable ? (
            <Button variant="contained" onClick={handleSaveDetails}>Save</Button>
          ) : (
            <Button variant="contained" onClick={handleEditDetails}>Edit</Button>
          )}
        </Box>
      </Box>

      {/* About Section */}
      <Box mb={2}>
        <Typography variant="h6">About</Typography>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          disabled={!aboutEditable}
        />
        <Box mt={2}>
          {aboutEditable ? (
            <Button variant="contained" onClick={handleSaveAbout}>Save</Button>
          ) : (
            <Button variant="contained" onClick={handleEditAbout}>Edit</Button>
          )}
        </Box>
      </Box>

      {/* Logout Button */}
      <Box mb={2}>
        <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
      </Box>

      {/* Logout Dialog */}
      <LogoutDialog />
    </Box>
  );
};

export default Profile;
