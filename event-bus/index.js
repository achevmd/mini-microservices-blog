const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  // Append event to events array
  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.sendStatus(200);
});

// Return events array
app.get('/events', (req, res) => {
  res.send(events);
});

// Start server
app.listen(4005, () => {
  console.log('Event-bus listening on 4005');
});
