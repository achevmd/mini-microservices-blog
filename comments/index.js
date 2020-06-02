const { randomBytes } = require('crypto');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Create express app
const app = express();
app.use(express.json());

const commentsByPostId = {};


// Retrieve comments for post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create comment for post
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id];

    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

// Listen to port
app.listen(4001, () => {
    console.log('Listening on 4001');
});