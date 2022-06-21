const express = require('express');

const { authSeller, authAdmin, authSellerOrAdmin } = require('../middleware/auth');
const Product = require('../models/product.model');
const validate = require('../middleware/validate');
const productValidation = require('../validations/product.validation');

const router = new express.Router();

router.post('/product', validate(productValidation.createProduct), authSeller, async (req, res) => {
  //   const product = new Product(req.body);
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/product', validate(productValidation.getProducts), authAdmin, async (req, res) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/product/:id', validate(productValidation.getProduct), authSellerOrAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send('not found');
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/product/:id', validate(productValidation.updateProduct), authSeller, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/product/:id', validate(productValidation.deleteProduct), authSeller, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('not found');
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
