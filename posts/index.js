const { randomBytes } = require('crypto');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Create express app
const app = express();
app.use(express.json());
const posts = {};

// Retrieve posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Create posts
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };
    res.status(201).send(posts[id]);
});

// Listen to port
app.listen(4000, () => {
    console.log('Listening on 4000');
});