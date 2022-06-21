const express = require('express');

const { authCustomer, authAdmin, authSellerOrAdmin } = require('../middleware/auth');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const validate = require('../middleware/validate');
const cartValidation = require('../validations/cart.validation');

const router = new express.Router();

router.post('/cart', validate(cartValidation.createCart), authCustomer, async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).send(cart);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/cart', validate(cartValidation.getCarts), authAdmin, async (req, res) => {
  try {
    const cart = await Cart.find();

    if (!cart) {
      return res.status(404).send();
    }
    res.send(cart);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/cart/:id', validate(cartValidation.getCart), authCustomer, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      res.status(404).send('not found');
    }
    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/cart-validate/:id', validate(cartValidation.getValidateCart), authSellerOrAdmin, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send('not found');
    }
    const product = await Product.findById(cart.product);
    if (!product) {
      return res.status(404).send('not found');
    }
    if (product.status !== 'available') {
      return res.status(404).send('product is sold out');
    }
    res.status(200).send('product is available');
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/cart/:id', validate(cartValidation.updateCart), authCustomer, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await cart.save();
    res.send(cart);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/cart/:id', validate(cartValidation.deleteCart), authCustomer, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).send('not found');
    }
    res.status(200).send(cart);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
