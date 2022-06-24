const mongoose = require('mongoose');

const onlineShopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowerCase: true,
      unique: true,
      maxLength: 25,
    },
    category: {
      type: String,
      required: true,
      enum: ['Laptop', 'Mobile', 'Electronics'],
    },
    product: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Product',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const onlineShop = mongoose.model('OnlineShop', onlineShopSchema);

module.exports = onlineShop;
