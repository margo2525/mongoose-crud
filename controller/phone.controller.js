const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const { Phone } = require('../models');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);

    if (!createdPhone) {
      return next(createHttpError(400, 'Bad Request'));
    }

    res.status(201).send({ data: createdPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit = 10 } = req.query;

  try {
    const foundPhone = await Phone.find().sort({ _id: 1 }).limit(limit).skip(0);

    res.status(200).send({ data: foundPhone });
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { phoneId } = req.params;

  try {
    const foundPhone = await Phone.findById(phoneId);
    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send({ data: foundPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    params: { phoneId },
    body,
  } = req;

  try {
    const updatedPhone = await Phone.findByIdAndUpdate(phoneId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(200).send({ data: updatedPhone });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { phoneId } = req.params;

  try {
    const deletedPhone = await Phone.findByIdAndDelete(phoneId);

    if (!deletedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
module.exports.getPhonesByUser = async (req, res, next) => {
  try {
    const foundPhonesByUser = await Phone.find().populate('userId');
    if (!foundPhonesByUser) {
      return next(createHttpError(400, 'bad request'));
    }
    res.status(200).send({ data: foundPhonesByUser });
  } catch (err) {
    next(err);
  }
};
module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    params: { phoneId },
  } = req;
  try {
    const updatePhone = await Phone.findByIdAndUpdate(phoneId, body, {
      new: true,
      runValidators: true,
    });
    if (!updatePhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    const preparedPhone = _.omit(updatePhone.toObject(), ['userId']);
    res.status(200).send({ data: preparedPhone });
  } catch (err) {
    next(err);
  }
};
