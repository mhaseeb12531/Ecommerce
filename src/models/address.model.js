const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    houseNo: {
      type: String,
      required: true,
      trim: true,
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
      enum: ['punjab', 'sindh', 'kpk', 'balochistan'],
      required: true,
    },
    defaultAddress: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
