const express = require('express');
const axios = require('axios');

// Create express app
const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received event: ', type);

  if (type === 'CommentCreated') {
    const { content } = data;
    // Reject comments that include the word 'orange'
    const status = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content,
      },
    });
  }

  res.send({});
});

// Listen to port
app.listen(4003, () => {
  console.log('Listening on 4003');
});
