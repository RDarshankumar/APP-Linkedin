import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Avatar, Button, Modal, TextField } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PostApp from './PostApp';
import ProfilePage from './ProfilePage';

// Custom Styled Components
const NavbarContainer = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #2193b0, #6dd5ed)', // Gradient background
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow effect
}));

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  width: '50%',
  marginLeft: theme.spacing(2),
  transition: 'background-color 0.3s ease', // Smooth background color transition
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

const NavbarButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}));

const Navbar = () => {
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

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUserDetails({ ...userDetails, image: imageUrl });
    setProfileImage(imageUrl);
  };

  const handleAddJobPost = () => {
    setJobPosts([...jobPosts, jobDetails]); // Add new job post to state
    setJobModalOpen(false);
  };

  return (
    <>
      <NavbarContainer position="static">
        <Toolbar>
          <Typography variant="h6" noWrap onClick={handleTitleClick} style={{ cursor: 'pointer', color: '#fff', transition: 'color 0.3s ease' }}>
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
            <NavbarButton
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleJobPostOpen}
              sx={{ marginRight: 2 }}
            >
              New Job
            </NavbarButton>
          )}

          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar src={profileImage} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.1)' } }} />
          </IconButton>
        </Toolbar>
      </NavbarContainer>

      {isProfileClicked ? (
        <ProfilePage onProfileImageChange={handleProfileImageChange} />
      ) : (
        <PostApp jobPosts={jobPosts} /> // Pass jobPosts to PostApp
      )}

      {/* Job Post Modal */}
      <Modal open={jobModalOpen} onClose={handleJobModalClose}>
        <Box p={4} bgcolor="white" mx="auto" my={8} borderRadius={2} maxWidth={500} sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
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

export default Navbar;
