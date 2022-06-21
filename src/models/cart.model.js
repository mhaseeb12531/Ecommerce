const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;
