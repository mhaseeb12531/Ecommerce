const mongoose = require('mongoose');
const enums = require('../utils/enums');

const addressSchema = mongoose.Schema(
  {
    houseNo: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    street: {
      type: String,
      required: false,
    },
    area: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: enums.state,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    defaultAddress: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
