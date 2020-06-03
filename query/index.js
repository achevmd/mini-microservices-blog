const express = require('express');
const cors = require('cors');

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

// Retrieve posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Listen to events
app.post('/events', (req, res) => {
  // Event type & data
  const { type, data } = req.body;

  // Process 'PostCreated' event
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  // Process 'CommentCreated' event
  if (type === 'CommentCreated') {
    const { id: commentId, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id: commentId, content });
  }

  res.send({});
});

// Listen to port
app.listen(4002, () => {
  console.log('Listening on 4002');
});
