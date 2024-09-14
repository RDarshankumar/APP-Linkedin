import React, { useState } from 'react';
import {
  Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Grid, Card, CardContent, CardMedia, IconButton, InputAdornment, Typography, Snackbar, Alert
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import JobIcon from '@mui/icons-material/Work'; // Import Job Icon
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useSnackbar } from 'notistack';

const postsData = [
  { type: 'image', content: 'First Image Post', media: '/path/to/image.jpg' },
  { type: 'video', content: 'First Video Post', media: '/path/to/video.mp4' },
  { type: 'article', content: 'First Article Post', media: '', banner: '/path/to/banner.jpg', heading: 'First Article' },
];

function SocialFeed() {
  const [activePostType, setActivePostType] = useState('all');
  const [posts, setPosts] = useState(postsData);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostHeading, setNewPostHeading] = useState('');
  const [mediaUpload, setMediaUpload] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [commentInput, setCommentInput] = useState({});
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handlePostTypeClick = (type) => {
    setActivePostType(type);
  };

  const handleOpenPopup = (type) => {
    setPopupType(type);
    setOpenPopup(true);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
    setJobTitle('');
    setExperience('');
    setSalary('');
    setLocation('');
  };

  const handlePost = () => {
    const newPost = {
      type: popupType,
      content: popupType === 'job' ? `${jobTitle} - ${experience} - ${salary} - ${location}` : newPostContent,
      heading: popupType === 'article' ? newPostHeading : '',
      media: mediaUpload || '',
    };
    setPosts([...posts, newPost]);
    setOpenPopup(false);
    setNewPostContent('');
    setNewPostHeading('');
    setMediaUpload(null);
    setJobTitle('');
    setExperience('');
    setSalary('');
    setLocation('');
  };

  const handleLike = (index) => {
    setLikes({ ...likes, [index]: !likes[index] });
  };

  const handleAddComment = (index) => {
    if (commentInput[index]) {
      setComments({
        ...comments,
        [index]: [...(comments[index] || []), commentInput[index]],
      });
      setCommentInput({ ...commentInput, [index]: '' });
    }
  };

  const handleCommentInputChange = (index, value) => {
    setCommentInput({ ...commentInput, [index]: value });
  };

  const handleDeletePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  const handleShare = (postContent) => {
    navigator.clipboard.writeText(postContent)
      .then(() => {
        setSnackbarMessage('Link copied to clipboard!');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const filteredPosts = activePostType === 'all' ? posts : posts.filter(post => post.type === activePostType);

  return (
    <Container>
      {/* Post Section */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <TextField
              label="Write a Post"
              fullWidth
              onClick={() => handleOpenPopup('text')}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <IconButton onClick={() => handleOpenPopup('image')}><ImageIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('video')}><VideoLibraryIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('article')}><ArticleIcon /></IconButton>
              <IconButton onClick={() => handleOpenPopup('job')}><JobIcon /></IconButton> {/* Job Icon */}
            </Box>
          </Box>

          {/* Post List */}
          {filteredPosts.map((post, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              {post.type === 'video' && post.media && (
                <CardMedia
                  component="video"
                  controls
                  src={post.media}
                  alt="Post media"
                />
              )}
              {post.type !== 'video' && post.media && (
                <CardMedia
                  component="img"
                  image={post.media}
                  alt="Post media"
                />
              )}
              <CardContent>
                <Typography variant="body1">{post.content}</Typography>
                {post.type === 'article' && post.heading && (
                  <Typography variant="h6">{post.heading}</Typography>
                )}
                {post.type === 'article' && post.banner && (
                  <CardMedia component="img" image={post.banner} alt="Article banner" />
                )}
                {comments[index] && (
                  <Box>
                    {comments[index].map((comment, i) => (
                      <Typography key={i} variant="body2">{comment}</Typography>
                    ))}
                  </Box>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => handleLike(index)}>
                    <ThumbUpIcon color={likes[index] ? 'primary' : 'action'} />
                  </IconButton>
                  <IconButton onClick={() => handleShare(post.content)}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    value={commentInput[index] || ''}
                    onChange={(e) => handleCommentInputChange(index, e.target.value)}
                    placeholder="Add a comment..."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => handleAddComment(index)}>
                            <CommentIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Popup Modals */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>{popupType.charAt(0).toUpperCase() + popupType.slice(1)} Post</DialogTitle>
        <DialogContent>
          {popupType === 'text' && (
            <TextField
              fullWidth
              label="Post Content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              multiline
              rows={4}
            />
          )}
          {popupType === 'image' && (
            <Box>
              <TextField
                fullWidth
                label="Post Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                multiline
                rows={2}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMediaUpload(URL.createObjectURL(e.target.files[0]))}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
            </Box>
          )}
          {popupType === 'video' && (
            <Box>
              <TextField
                fullWidth
                label="Post Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                multiline
                rows={2}
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setMediaUpload(URL.createObjectURL(e.target.files[0]))}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button variant="contained" component="span">
                  Upload Video
                </Button>
              </label>
            </Box>
          )}
          {popupType === 'article' && (
            <Box>
              <TextField
                fullWidth
                label="Article Heading"
                value={newPostHeading}
                onChange={(e) => setNewPostHeading(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Article Content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMediaUpload(URL.createObjectURL(e.target.files[0]))}
                style={{ display: 'none' }}
                id="banner-input"
              />
              <label htmlFor="banner-input">
                <Button variant="contained" component="span">
                  Upload Banner
                </Button>
              </label>
            </Box>
          )}
          {popupType === 'job' && (
            <Box>
              <TextField
                fullWidth
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handlePost} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SocialFeed;
