const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['sold out', 'available'],
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
