import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Modal, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit } from '@mui/icons-material';
import jsPDF from 'jspdf'; // Import jsPDF

const ProfilePage = ({ onProfileImageChange }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [aboutEditable, setAboutEditable] = useState(false);
  const [detailsEditable, setDetailsEditable] = useState(false);

  const [educationList, setEducationList] = useState([]);
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [certificatesList, setCertificatesList] = useState([]);

  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [workExperienceModalOpen, setWorkExperienceModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const [currentEducation, setCurrentEducation] = useState({ degree: '', school: '', percentage: '' });
  const [currentWorkExperience, setCurrentWorkExperience] = useState({ title: '', company: '', startDate: '', endDate: '' });
  const [currentCertificate, setCurrentCertificate] = useState({ name: '', company: '', startDate: '', endDate: '' });

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
      setBanner(profileData.banner);
      setProfileImage(profileData.profileImage);
      setDescription(profileData.description);
      setCity(profileData.city);
      setCountry(profileData.country);
      setPhone(profileData.phone);
      setEmail(profileData.email);
      setName(profileData.name);
      setUsername(profileData.username);
      setEducationList(profileData.educationList || []);
      setWorkExperienceList(profileData.workExperienceList || []);
      setCertificatesList(profileData.certificatesList || []);
    }
  }, []);

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
      educationList,
      workExperienceList,
      certificatesList
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
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

  const handleAddEducation = () => {
    setEducationList([...educationList, currentEducation]);
    setCurrentEducation({ degree: '', school: '', percentage: '' });
    setEducationModalOpen(false);
    saveToLocalStorage();
  };

  const handleEditEducation = (index) => {
    setCurrentEducation(educationList[index]);
    setEducationModalOpen(true);
    setEducationList(educationList.filter((_, idx) => idx !== index));
  };

  const handleDeleteEducation = (index) => {
    setEducationList(educationList.filter((_, idx) => idx !== index));
    saveToLocalStorage();
  };

  const handleAddWorkExperience = () => {
    setWorkExperienceList([...workExperienceList, currentWorkExperience]);
    setCurrentWorkExperience({ title: '', company: '', startDate: '', endDate: '' });
    setWorkExperienceModalOpen(false);
    saveToLocalStorage();
  };

  const handleEditWorkExperience = (index) => {
    setCurrentWorkExperience(workExperienceList[index]);
    setWorkExperienceModalOpen(true);
    setWorkExperienceList(workExperienceList.filter((_, idx) => idx !== index));
  };

  const handleDeleteWorkExperience = (index) => {
    setWorkExperienceList(workExperienceList.filter((_, idx) => idx !== index));
    saveToLocalStorage();
  };

  const handleAddCertificate = () => {
    setCertificatesList([...certificatesList, currentCertificate]);
    setCurrentCertificate({ name: '', company: '', startDate: '', endDate: '' });
    setCertificateModalOpen(false);
    saveToLocalStorage();
  };

  const handleEditCertificate = (index) => {
    setCurrentCertificate(certificatesList[index]);
    setCertificateModalOpen(true);
    setCertificatesList(certificatesList.filter((_, idx) => idx !== index));
  };

  const handleDeleteCertificate = (index) => {
    setCertificatesList(certificatesList.filter((_, idx) => idx !== index));
    saveToLocalStorage();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    onProfileImageChange(imageUrl);
    saveToLocalStorage();
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setBanner(imageUrl);
    saveToLocalStorage();
  };

  const generateCV = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Curriculum Vitae', 14, 22);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 14, 40);
    doc.text(`Username: ${username}`, 14, 50);
    doc.text(`Description: ${description}`, 14, 60);
    doc.text(`City: ${city}`, 14, 70);
    doc.text(`Country: ${country}`, 14, 80);
    doc.text(`Phone: ${phone}`, 14, 90);
    doc.text(`Email: ${email}`, 14, 100);

    doc.text('Education:', 14, 120);
    educationList.forEach((education, index) => {
      doc.text(`${education.degree} from ${education.school} (${education.percentage}%)`, 14, 130 + index * 10);
    });

    doc.text('Work Experience:', 14, 150 + educationList.length * 10);
    workExperienceList.forEach((experience, index) => {
      doc.text(`${experience.title} at ${experience.company} (${experience.startDate} - ${experience.endDate})`, 14, 160 + index * 10 + educationList.length * 10);
    });

    doc.text('Certificates:', 14, 180 + workExperienceList.length * 10 + educationList.length * 10);
    certificatesList.forEach((certificate, index) => {
      doc.text(`${certificate.name} from ${certificate.company} (${certificate.startDate} - ${certificate.endDate})`, 14, 190 + index * 10 + workExperienceList.length * 10 + educationList.length * 10);
    });

    doc.save('CV.pdf');
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
      <Box display="flex" justifyContent="center" mb={2}>
        <img src={banner} alt="Banner" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <input type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} id="banner-upload" />
        <label htmlFor="banner-upload">
          <Button variant="contained" component="span">Change Banner</Button>
        </label>
      </Box>

      {/* Profile Image Section */}
      <Box display="flex" justifyContent="center" mb={2}>
        <img src={profileImage} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} id="profile-image-upload" />
        <label htmlFor="profile-image-upload">
          <Button variant="contained" component="span">Change Profile Image</Button>
        </label>
      </Box>

      {/* Details Section */}
      <Box mb={2}>
        <Typography variant="h6">Details</Typography>
        <TextField
          label="Name"
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

      {/* Education Section */}
      <Box mb={2}>
        <Typography variant="h6">Education</Typography>
        {educationList.map((education, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body1">{education.degree} from {education.school} ({education.percentage}%)</Typography>
            <Button onClick={() => handleEditEducation(index)} color="primary">Edit</Button>
            <Button onClick={() => handleDeleteEducation(index)} color="secondary">Delete</Button>
          </Box>
        ))}
        <Button variant="contained" onClick={() => setEducationModalOpen(true)}>Add Education</Button>
      </Box>

      {/* Work Experience Section */}
      <Box mb={2}>
        <Typography variant="h6">Work Experience</Typography>
        {workExperienceList.map((experience, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body1">{experience.title} at {experience.company} ({experience.startDate} - {experience.endDate})</Typography>
            <Button onClick={() => handleEditWorkExperience(index)} color="primary">Edit</Button>
            <Button onClick={() => handleDeleteWorkExperience(index)} color="secondary">Delete</Button>
          </Box>
        ))}
        <Button variant="contained" onClick={() => setWorkExperienceModalOpen(true)}>Add Work Experience</Button>
      </Box>

      {/* Certificates Section */}
      <Box mb={2}>
        <Typography variant="h6">Certificates</Typography>
        {certificatesList.map((certificate, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body1">{certificate.name} from {certificate.company} ({certificate.startDate} - {certificate.endDate})</Typography>
            <Button onClick={() => handleEditCertificate(index)} color="primary">Edit</Button>
            <Button onClick={() => handleDeleteCertificate(index)} color="secondary">Delete</Button>
          </Box>
        ))}
        <Button variant="contained" onClick={() => setCertificateModalOpen(true)}>Add Certificate</Button>
      </Box>

      {/* Generate CV Button */}
      <Box mb={2}>
        <Button variant="contained" onClick={generateCV}>Generate CV</Button>
      </Box>

      {/* Logout Button */}
      <Box mb={2}>
        <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
      </Box>

      {/* Dialogs for Modals */}
      <Dialog open={educationModalOpen} onClose={() => setEducationModalOpen(false)}>
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <TextField
            label="Degree"
            value={currentEducation.degree}
            onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="School"
            value={currentEducation.school}
            onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Percentage"
            value={currentEducation.percentage}
            onChange={(e) => setCurrentEducation({ ...currentEducation, percentage: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEducationModalOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddEducation} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={workExperienceModalOpen} onClose={() => setWorkExperienceModalOpen(false)}>
        <DialogTitle>Add Work Experience</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={currentWorkExperience.title}
            onChange={(e) => setCurrentWorkExperience({ ...currentWorkExperience, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            value={currentWorkExperience.company}
            onChange={(e) => setCurrentWorkExperience({ ...currentWorkExperience, company: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentWorkExperience.startDate}
            onChange={(e) => setCurrentWorkExperience({ ...currentWorkExperience, startDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentWorkExperience.endDate}
            onChange={(e) => setCurrentWorkExperience({ ...currentWorkExperience, endDate: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkExperienceModalOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddWorkExperience} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={certificateModalOpen} onClose={() => setCertificateModalOpen(false)}>
        <DialogTitle>Add Certificate</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentCertificate.name}
            onChange={(e) => setCurrentCertificate({ ...currentCertificate, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            value={currentCertificate.company}
            onChange={(e) => setCurrentCertificate({ ...currentCertificate, company: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentCertificate.startDate}
            onChange={(e) => setCurrentCertificate({ ...currentCertificate, startDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentCertificate.endDate}
            onChange={(e) => setCurrentCertificate({ ...currentCertificate, endDate: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertificateModalOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleAddCertificate} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <LogoutDialog />
    </Box>
  );
};

export default ProfilePage;
