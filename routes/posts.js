const express = require('express');
const router = express.Router();

// Require Post Schema
const Post = require('../models/Post');
const { json } = require('body-parser');

// Get all Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Get a Post with id as parameter
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById({ _id: id });
    // if (!post) res.json({ message: `No post with id ${id}` });
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// Add e new Post
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const post = new Post({
      title,
      description,
    });
    await post.save();
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update a Post with id as parameter
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  // Get title & description from body
  const { title, description } = req.body;
  // If title && description not defined, return
  if (!title && !description) {
    return res.json({ message: 'Title or description not specified' });
  }
  // Create Empty Object
  const update = {};
  // Add title in Object if title is present (prevent undefined)
  if (title) update['title'] = title;
  // Add description in Object if description is present (prevent undefined)
  if (description) update['description'] = description;
  //   if (title === undefined && !description === undefined) {
  //     res.json({ message: 'Title or description not specified' });
  //   }
  try {
    // Add date for updated_at
    update['updated_at'] = Date.now();
    const postUpdate = await Post.updateOne({ _id: id }, { $set: update });
    res.json(postUpdate);
  } catch (error) {
    res.json(error);
  }
});

// Delete a Post with id as parameter
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const postDeleted = await Post.remove({ _id: id });
    res.json(postDeleted);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
