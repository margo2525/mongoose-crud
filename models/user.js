const mongoose = require('mongoose');
const yup = require('yup');

const EMAIL_VALIDATION_SCHEMA = yup.string().email();

// required
// Number, Date: min, max
// String: match, emun, minLength, maxLength
// default
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 64,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 64,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: v => EMAIL_VALIDATION_SCHEMA.isValidSync(v),
      },
    },
    birthday: {
      type: Date,
      max: new Date(),
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    isMerried: {
      type: Boolean,
      default: false,
    },
    workExperience: {
      type: Number,
      min: 0,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
