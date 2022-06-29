const express = require('express');

const router = new express.Router();

const { authCustomer, authAdmin } = require('../middleware/auth');
const CartDetails = require('../models/cartDetails.model');
const Product = require('../models/product.model');
const validate = require('../middleware/validate');
const cartDetailsValidation = require('../validations/cartDetails.validation');

router.post('/cartDetails', validate(cartDetailsValidation.createCart), authCustomer, async (req, res) => {
  try {
    if (req.user.id !== req.body.customer) {
      return res.status(400).send('not autherized');
    }
    const cartDetails = await CartDetails.create(req.body);
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
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
    if (req.user.id !== req.body.customer) {
      return res.status(400).send('not autherized');
    }
    const cartDetails = await CartDetails.findById(req.params.id);
    if (!cartDetails) {
      res.status(404).send('not found');
    }
    res.status(200).send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/cartDetails/validate/:id', validate(cartDetailsValidation.getValidateCart), authCustomer, async (req, res) => {
  try {
    let cartDetails = await CartDetails.find({ customer: req.user.id }).select('product -_id').lean();
    cartDetails = cartDetails.map((product) => product.product._id);
    if (!cartDetails) {
      return res.status(404).send('not found');
    }
    const products = await Product.find({ _id: { $in: cartDetails } });

    for (let i = 0; i < products.length; i += 1) {
      if (products[i].status !== 'available') {
        return res.status(404).send('one of the product is sold out');
      }
    }
    res.status(200).send('products are available');
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/cartDetails/:id', validate(cartDetailsValidation.updateCart), authCustomer, async (req, res) => {
  try {
    if (req.user.id !== req.body.customer) {
      return res.status(400).send('not autherized');
    }
    const cartDetails = await CartDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(cartDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/cartDetails/:id', validate(cartDetailsValidation.deleteCart), authCustomer, async (req, res) => {
  try {
    if (req.user.id !== req.body.customer) {
      return res.status(400).send('not autherized');
    }
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
