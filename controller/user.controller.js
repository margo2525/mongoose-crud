const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, Post, Phone } = require('../models');
//User
module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createHttpError(400, 'Bad Request'));
    }

    res.status(201).send({ data: createdUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit = 10 } = req.query;

  try {
    const foundUser = await User.find().sort({ _id: 1 }).limit(limit).skip(0);

    res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    // runValidators: true, - "вмикає" валідатори, описані в моделі

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(200).send({ data: updatedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
//Post
module.exports.createUserPost = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const newPost = {
      ...body,
      userId: new mongoose.Types.ObjectId(userId),
    };

    const createdPost = await Post.create(newPost);

    if (!createdPost) {
      return next(createHttpError(400, 'Bad Request'));
    }

    // Метод інстансу моделі toObject() повертає JS-об'єкт
    const preparedPost = _.omit(createdPost.toObject(), ['updatedAt']);

    res.status(201).send({ data: preparedPost });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // aggregate (+ match, lookup, project)
    // працює аналогично aggregate в MongoDB:
    // - match - фільтр,
    // - lookup - з'єднання з документами іншої колекції за вказаними критеріями
    // - project - проєкція (які поля отриманих документів включати в результат)
    const foundPosts = await User.aggregate()
      .match({ _id: new mongoose.Types.ObjectId(userId) })
      .lookup({
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'userPosts',
      })
      .project({ userPosts: 1, _id: 0 });

    if (!foundPosts.length) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundPosts });
  } catch (err) {
    next(err);
  }
};

//Phone

module.exports.createUserPhones = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const createdPhone = await foundUser.phones.push(body);

    if (!createdPhone) {
      return next(createHttpError(400, 'Bad Request create phones'));
    }

    res.status(200).send({ data: foundUser.phones });
  } catch (err) {
    next(err);
  }
};
module.exports.getUserPhone = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundPhones = await User.aggregate()
      .match({ _id: mongoose.Types.ObjectId(userId) })
      .lookup({
        from: 'phones',
        localField: '_id',
        foreignField: 'userId',
        as: 'userPhones',
      });
    // .project({ userPhones: 1, _id: 0 });

    if (!foundPhones.length) {
      return next(createHttpError(404, 'user not found'));
    }
    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};
