require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express
const app = express();

const middlewares = require('./middlewares');

// Get data as JSON from request
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

// Get posts routes
const postsRoute = require('./routes/posts');

app.get('/', (req, res) => {
  res.json({ message: 'Restful API with Express & MongoDB' });
});

// http://<domain>/posts
app.use('/posts', postsRoute);

// Add middlewares to app
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Connect to mongoDB
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    // If connection to mongoDB fail, return new Error and stop process
    if (err) return new Error(err);

    // If connection to mongoDB, start server
    app.listen(port, () => console.log(`Running on port ${port}`));
  }
);
