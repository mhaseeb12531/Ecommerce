const express = require('express');

const { authSellerOrCustomer, authAdmin } = require('../middleware/auth');
const Address = require('../models/address.model');
const validate = require('../middleware/validate');
const addressValidation = require('../validations/address.validation');

const router = new express.Router();

router.post('/address', validate(addressValidation.createAddress), authSellerOrCustomer, async (req, res) => {
  try {
    const add = await Address.findOne({ user: req.user._id });
    let address;
    if (add) {
      address = await Address.create({ ...req.body, customer: req.user, default: false });
    } else {
      address = await Address.create({ ...req.body, user: req.user, default: true });
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/address', validate(addressValidation.getAddresses), authAdmin, async (req, res) => {
  try {
    const address = await Address.find();
    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/address/:id', validate(addressValidation.getAddress), authAdmin, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      res.status(404).send('not found');
    }
    res.status(200).send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/address/default/:id', validate(addressValidation.getAddress), authSellerOrCustomer, async (req, res) => {
  try {
    const address = await Address.findOne({ customer: req.user.id, defaultAddress: true });
    if (!address) {
      return res.status(404).send('not found');
    }
    address.defaultAddress = false;
    await address.save();

    const DefaultAddress = await Address.findByIdAndUpdate(
      req.params.id,
      { defaultAddress: true },
      {
        new: true,
      }
    );
    res.status(200).send({ DefaultAddress });
  } catch (e) {
    // console.log(e);
    res.status(500).send({ message: e.message });
  }
});

router.patch('/address/:id', validate(addressValidation.updateAddress), authSellerOrCustomer, async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await address.save();
    res.send(address);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/address/:id', validate(addressValidation.deleteAddress), authSellerOrCustomer, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).send('not found');
    }
    const result = await Address.deleteOne({ address });
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
