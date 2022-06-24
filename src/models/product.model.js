const mongoose = require('mongoose');

const enums = require('../utils/enums');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      upperCase: true,
      maxLength: 40,
    },
    price: {
      type: Number,
      required: true,
      integer: true,
    },
    quantity: {
      type: Number,
      required: true,
      integer: true,
    },
    status: {
      type: String,
      required: true,
      enum: enums.status,
    },
    description: {
      type: String,
    },
    onlineShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OnlineShop',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
