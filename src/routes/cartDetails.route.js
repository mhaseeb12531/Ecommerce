const express = require('express');

const { authCustomer, authAdmin, authSellerOrAdmin } = require('../middleware/auth');
const CartDetails = require('../models/cartDetails.model');
const Product = require('../models/product.model');
const validate = require('../middleware/validate');
const cartDetailsValidation = require('../validations/cartDetails.validation');

const router = new express.Router();

router.post('/cartDetails', validate(cartDetailsValidation.createCart), authCustomer, async (req, res) => {
  try {
    const cartDetails = await CartDetails.create(req.body);
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/cartDetails', validate(cartDetailsValidation.getCarts), authAdmin, async (req, res) => {
  try {
    const cartDetails = await CartDetails.find();
    if (!cartDetails) {
      return res.status(404).send();
    }
    res.send(cartDetails);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/cartDetails/:id', validate(cartDetailsValidation.getCart), authCustomer, async (req, res) => {
  try {
    const cartDetails = await CartDetails.findById(req.params.id);
    if (!cartDetails) {
      res.status(404).send('not found');
    }
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get(
  '/cartDetails-validate/:id',
  validate(cartDetailsValidation.getValidateCart),
  authSellerOrAdmin,
  async (req, res) => {
    try {
      const cartDetails = await CartDetails.findById(req.params.id);
      if (!cartDetails) {
        return res.status(404).send('not found');
      }
      const product = await Product.findById(cartDetails.product);
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
  }
);

router.patch('/cartDetails/:id', validate(cartDetailsValidation.updateCart), authCustomer, async (req, res) => {
  try {
    const cartDetails = await CartDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await CartDetails.save();
    res.send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/cartDetails/:id', validate(cartDetailsValidation.deleteCart), authCustomer, async (req, res) => {
  try {
    const cartDetails = await CartDetails.findByIdAndDelete(req.params.id);
    if (!cartDetails) {
      return res.status(404).send('not found');
    }
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
