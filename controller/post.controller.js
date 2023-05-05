const { Post } = require('./../models');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');

module.exports.createPost = async (req, res, next) => {
  const { body } = req;
  try {
    const newPostInstance = new Post(body);
    const newPost = await newPostInstance.save();
    if (!newPost) {
      return next(createHttpError(400, 'Bad request'));
    }
    res.status(201).send({ data: newPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getPosts = async (req, res, next) => {
  try {
    const foundPosts = await Post.find().limit(10).skip(0).populate('userId');
    if (!foundPosts) {
      return next(createHttpError(404, 'Not found'));
    }
    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};

module.exports.getPostById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId).populate('userId');
    if (!foundPost) {
      return next(createHttpError(404, 'Not found'));
    }
    res.status(200).send({ data: foundPost });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  const {
    params: { postId },
    body,
  } = req;
  try {
    const updPost = await Post.findByIdAndUpdate(postId, body, {
      new: true,
      runValidators: true,
    });
    if (!updPost) {
      next(createHttpError(404, 'Post not found'));
    }
    res.status(200).send({ data: updPost });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      next(createHttpError(404, 'Post not found'));
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
