const express = require('express');

const { authCustomer, authAdmin, authSellerOrCustomer } = require('../middleware/auth');
const Order = require('../models/order.model');
const validate = require('../middleware/validate');
const orderValidation = require('../validations/order.validation');

const router = new express.Router();

router.post('/order', validate(orderValidation.createOrder), authCustomer, async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/order', validate(orderValidation.getOrders), authAdmin, async (req, res) => {
  try {
    const order = await Order.find();

    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/order/:id', validate(orderValidation.getOrder), authSellerOrCustomer, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).send('not found');
    }
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/order/:id', validate(orderValidation.updateOrder), authCustomer, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await order.save();
    res.send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/order/:id', validate(orderValidation.deleteOrder), authCustomer, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('not found');
    }
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
