import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar, Button, Modal, TextField
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Profile from './Profile';
import SocialFeed from './SocialFeed';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
  width: '50%',
  marginLeft: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const MainAppBar = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [showNewJobButton, setShowNewJobButton] = useState(false); // To show New Job+ button after form save
  const [userDetails, setUserDetails] = useState({
    name: '',
    company: '',
    email: '',
    accountNumber: '',
    image: null,
  });
  const [jobDetails, setJobDetails] = useState({
    title: '',
    experience: '',
    salary: '',
    location: '',
  });
  const [jobPosts, setJobPosts] = useState([]); // State to hold job posts

  const handleProfileClick = () => {
    setIsProfileClicked(true);
  };

  const handleTitleClick = () => {
    setIsProfileClicked(false);
  };

  const handleProfileImageChange = (newImage) => {
    setProfileImage(newImage);
  };

  const handleJobModalClose = () => {
    setJobModalOpen(false);
  };

  const handleJobPostOpen = () => {
    setJobModalOpen(true);
  };

  const handleUserDetailChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleJobDetailChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  // Image URL cleanup to avoid memory leak
  useEffect(() => {
    return () => {
      if (userDetails.image) {
        URL.revokeObjectURL(userDetails.image);
      }
    };
  }, [userDetails.image]);

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUserDetails({ ...userDetails, image: imageUrl });
    setProfileImage(imageUrl);
  };

  const handleAddJobPost = () => {
    // Validate job details
    if (!jobDetails.title || !jobDetails.experience || !jobDetails.salary || !jobDetails.location) {
      alert("Please fill all fields before posting.");
      return;
    }
    setJobPosts([...jobPosts, jobDetails]); // Add new job post to state
    setJobModalOpen(false);
    setShowNewJobButton(true); // Show "New Job+" button after first post
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
            MyApp
          </Typography>
          <SearchBar>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </SearchBar>
          <Box sx={{ flexGrow: 1 }} />

          {/* New Job+ Button in Navbar */}
          {showNewJobButton && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleJobPostOpen}
              sx={{ marginRight: 2 }}
            >
              New Job
            </Button>
          )}

          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar src={profileImage} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {isProfileClicked ? (
        <Profile onProfileImageChange={handleProfileImageChange} />
      ) : (
        <SocialFeed jobPosts={jobPosts} /> // Pass jobPosts to PostApp
      )}

      {/* Job Post Modal */}
      <Modal open={jobModalOpen} onClose={handleJobModalClose}>
        <Box p={4} bgcolor="white" mx="auto" my={8} borderRadius={2} maxWidth={500}>
          <Typography variant="h6">New Job Post</Typography>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={jobDetails.title}
            onChange={handleJobDetailChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Work Experience"
            name="experience"
            value={jobDetails.experience}
            onChange={handleJobDetailChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={jobDetails.salary}
            onChange={handleJobDetailChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={jobDetails.location}
            onChange={handleJobDetailChange}
            sx={{ mt: 2 }}
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" onClick={handleAddJobPost}>Post</Button>
            <Button variant="outlined" onClick={handleJobModalClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MainAppBar;
