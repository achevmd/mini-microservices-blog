const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
  // Process 'PostCreated' event
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  // Process 'CommentCreated' event
  if (type === 'CommentCreated') {
    const { id: commentId, content, status, postId } = data;
    const post = posts[postId];
    post.comments.push({ id: commentId, content, status });
  }

  // Process 'CommentUpdated' event
  if (type === 'CommentUpdated') {
    const { id: commentId, content, status, postId } = data;
    const post = posts[postId];
    let comment = post.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
};

// Retrieve posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Listen to events
app.post('/events', (req, res) => {
  // Process events
  const { type, data } = req.body;
  eventHandler(type, data);
  res.send({});
});

// Listen to port
app.listen(4002, async () => {
  console.log('Listening on 4002');

  const { data: events } = await axios.get('http://localhost:4005/events');
  events.forEach((event) => {
    eventHandler(event.type, event.data);
  });
});
