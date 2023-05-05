const mongoose = require('mongoose');
const yup = require('yup');
const phoneSchema = new mongoose.Schema(
  {
    brand: { type: 'string', required: true, minLength: 2, maxLength: 64 },
    model: { type: 'string', required: true, minLength: 2, maxLength: 64 },
    manufactureDate: { type: 'date', max: new Date(), required: true },
    ram: { type: 'number', min: 0, default: 1 },
    cpu: { type: 'string', required: true },
    nfc: { type: 'boolean', default: false },

    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
