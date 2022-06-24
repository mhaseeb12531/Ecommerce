const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    onlineShop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OnlineShop',
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    order_detais: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'OrderDetails',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model('Order', orderSchema);

module.exports = order;
