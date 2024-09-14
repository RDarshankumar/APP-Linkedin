import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Dialog, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Photo as PhotoIcon, VideoCall as VideoIcon, Article as ArticleIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon, Share as ShareIcon, Delete as DeleteIcon } from '@mui/icons-material';

function PostFeed() {
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [postType, setPostType] = useState(null); // 'text', 'image', 'video', 'article'
    const [postContent, setPostContent] = useState('');
    const [postItems, setPostItems] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState({}); // Stores comments by post id

    // Open/Close Post Dialog
    const handleOpenPostDialog = (type) => {
        setPostType(type);
        setOpenPostDialog(true);
    };

    const handleClosePostDialog = () => {
        setOpenPostDialog(false);
        setPostType(null);
        setPostContent('');
    };

    // Handle Posting
    const handlePost = () => {
        const newPost = { id: postItems.length, type: postType, content: postContent };
        setPostItems([newPost, ...postItems]);
        handleClosePostDialog();
    };

    // Handle Like Functionality
    const handleLike = (postId) => {
        setLikedPosts((prevLikes) =>
            prevLikes.includes(postId) ? prevLikes.filter((id) => id !== postId) : [...prevLikes, postId]
        );
    };

    // Handle Comment Functionality
    const handleComment = (postId) => {
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: [...(prevComments[postId] || []), commentContent],
        }));
        setCommentContent('');
    };

    // Handle Delete Functionality
    const handleDelete = (postId) => {
        setPostItems(postItems.filter((post) => post.id !== postId));
    };

    // Handle Share Functionality
    const handleShare = (postId) => {
        navigator.clipboard.writeText(`Post ID: ${postId}`);
        alert('Post link copied!');
    };

    return (
        <Box>
            {/* Post Input */}
            <Box sx={{ marginBottom: '20px' }}>
                <TextField
                    placeholder="What do you want to post?"
                    fullWidth
                    onClick={() => handleOpenPostDialog('text')}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <IconButton onClick={() => handleOpenPostDialog('image')}>
                        <PhotoIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenPostDialog('video')}>
                        <VideoIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenPostDialog('article')}>
                        <ArticleIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Post Dialog */}
            <Dialog open={openPostDialog} onClose={handleClosePostDialog}>
                <Box sx={{ padding: '20px', minWidth: '400px' }}>
                    <Typography variant="h6">{postType === 'image' ? 'Upload Image' : postType === 'video' ? 'Upload Video' : postType === 'article' ? 'Post Article' : 'Create Post'}</Typography>
                    <TextField
                        placeholder={postType === 'text' ? "What's on your mind?" : 'Enter caption'}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={postType === 'article' ? 3 : 1}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                    {postType === 'article' && (
                        <TextField placeholder="Article Heading" fullWidth margin="normal" value={postContent} />
                    )}
                    <Button onClick={handlePost} variant="contained" color="primary" fullWidth>
                        Post
                    </Button>
                    <Button onClick={handleClosePostDialog} variant="outlined" fullWidth sx={{ marginTop: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </Dialog>

            {/* Post List */}
            <List>
                {postItems.map((post) => (
                    <ListItem key={post.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ListItemAvatar>
                            <Avatar>{post.type[0].toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={post.content} secondary={`Posted as ${post.type}`} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton onClick={() => handleLike(post.id)}>
                                <ThumbUpIcon color={likedPosts.includes(post.id) ? 'primary' : 'inherit'} />
                            </IconButton>
                            <IconButton onClick={() => handleComment(post.id)}>
                                <CommentIcon />
                            </IconButton>
                            <IconButton onClick={() => handleShare(post.id)}>
                                <ShareIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(post.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default PostFeed;
