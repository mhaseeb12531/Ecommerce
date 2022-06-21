const express = require('express');

const { authCustomer, authAdmin } = require('../middleware/auth');
const OrderDetails = require('../models/orderDetails.model');
const validate = require('../middleware/validate');
const orderDetailsValidation = require('../validations/orderDetails.validation');

const router = new express.Router();

router.post('/orderDetails', validate(orderDetailsValidation.createOrderDetails), authCustomer, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.create(req.body);
    res.status(200).send(orderDetails);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/orderDetails', validate(orderDetailsValidation.getAllOrderDetails), authAdmin, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find();

    if (!orderDetails) {
      return res.status(404).send();
    }
    res.send(orderDetails);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/orderDetails/:id', validate(orderDetailsValidation.getOrderDetails), authCustomer, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findById(req.params.id);
    if (!orderDetails) {
      res.status(404).send('not found');
    }
    res.status(200).send(orderDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/orderDetails/:id', validate(orderDetailsValidation.updateOrderDetails), authCustomer, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await orderDetails.save();
    res.send(orderDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/orderDetails/:id', validate(orderDetailsValidation.deleteOrderDetails), authCustomer, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findByIdAndDelete(req.params.id);
    if (!orderDetails) {
      return res.status(404).send('not found');
    }
    res.status(200).send(orderDetails);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
