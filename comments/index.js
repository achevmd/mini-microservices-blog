const { randomBytes } = require('crypto');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

// Retrieve comments for post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment for post
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id },
  });

  res.status(201).send(comments);
});

app.post('/events', (req, res) => {
  console.log('Received event: ', req.body.type);

  res.send({});
});

// Listen to port
app.listen(4001, () => {
  console.log('Listening on 4001');
});
