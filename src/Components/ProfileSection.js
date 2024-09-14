import React, { useState } from 'react';
import { Dialog, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function ProfileSection() {
    const [openEducationDialog, setOpenEducationDialog] = useState(false);
    const [openCertificationDialog, setOpenCertificationDialog] = useState(false);
    const [openExperienceDialog, setOpenExperienceDialog] = useState(false);

    const handleOpenEducationDialog = () => setOpenEducationDialog(true);
    const handleCloseEducationDialog = () => setOpenEducationDialog(false);

    const handleOpenCertificationDialog = () => setOpenCertificationDialog(true);
    const handleCloseCertificationDialog = () => setOpenCertificationDialog(false);

    const handleOpenExperienceDialog = () => setOpenExperienceDialog(true);
    const handleCloseExperienceDialog = () => setOpenExperienceDialog(false);

    return (
        <Box>
            {/* Education Section */}
            <Typography variant="h6">Education</Typography>
            <IconButton onClick={handleOpenEducationDialog}>
                <AddIcon />
            </IconButton>

            <Dialog open={openEducationDialog} onClose={handleCloseEducationDialog}>
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h6">Add Education</Typography>
                    <TextField label="School Name" fullWidth margin="normal" />
                    <TextField label="Degree" fullWidth margin="normal" />
                    <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="End Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <Button onClick={handleCloseEducationDialog} variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </Box>
            </Dialog>

            {/* Certification Section */}
            <Typography variant="h6">Certifications</Typography>
            <IconButton onClick={handleOpenCertificationDialog}>
                <AddIcon />
            </IconButton>

            <Dialog open={openCertificationDialog} onClose={handleCloseCertificationDialog}>
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h6">Add Certification</Typography>
                    <TextField label="Certification Name" fullWidth margin="normal" />
                    <TextField label="Institute Name" fullWidth margin="normal" />
                    <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="End Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <Button onClick={handleCloseCertificationDialog} variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </Box>
            </Dialog>

            {/* Work Experience Section */}
            <Typography variant="h6">Work Experience</Typography>
            <IconButton onClick={handleOpenExperienceDialog}>
                <AddIcon />
            </IconButton>

            <Dialog open={openExperienceDialog} onClose={handleCloseExperienceDialog}>
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h6">Add Work Experience</Typography>
                    <TextField label="Company Name" fullWidth margin="normal" />
                    <TextField label="Role" fullWidth margin="normal" />
                    <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="End Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <Button onClick={handleCloseExperienceDialog} variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
}

export default ProfileSection;
