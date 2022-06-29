const express = require('express');

const { authSeller, authAdmin, authSellerOrAdmin } = require('../middleware/auth');
const OnlineShop = require('../models/onlineShop.model');
const validate = require('../middleware/validate');
const onlineShopValidation = require('../validations/onlineShop.validation');

const router = new express.Router();

router.post('/onlineShop', validate(onlineShopValidation.createOnlineShop), authSellerOrAdmin, async (req, res) => {
  const onlineShop = new OnlineShop(req.body);
  try {
    await onlineShop.save();
    res.status(200).send(onlineShop);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/onlineShop', validate(onlineShopValidation.getAllOnlineShopes), authAdmin, async (req, res) => {
  try {
    const onlineShop = await OnlineShop.find();
    if (!onlineShop) {
      return res.status(404).send();
    }
    res.send(onlineShop);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/onlineShop/:id', validate(onlineShopValidation.getOnlineShop), authSellerOrAdmin, async (req, res) => {
  try {
    const onlineShop = await OnlineShop.findById(req.params.id);
    if (!onlineShop) {
      res.status(404).send('not found');
    }
    res.status(200).send(onlineShop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/onlineShop/user/:id', validate(onlineShopValidation.getOnlineShopByUser), authAdmin, async (req, res) => {
  try {
    const onlineShop = await OnlineShop.find({ user: req.params.id });
    if (!onlineShop) {
      res.status(404).send('not found');
    }
    res.status(200).send(onlineShop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/onlineShop/:id', validate(onlineShopValidation.updateOnlineShop), authSeller, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'product', 'address'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send('invalid updates');
  }
  try {
    const onlineShop = await OnlineShop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await onlineShop.save();
    res.send(onlineShop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/onlineShop-product/:id', validate(onlineShopValidation.addProduct), authSeller, async (req, res) => {
  try {
    const onlineShop = await OnlineShop.findByIdAndUpdate(
      req.params.id,
      { $push: { product: req.body.product } },
      {
        new: true,
      }
    );
    await onlineShop.save();
    res.send(onlineShop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch(
  '/onlineShop-product-remove/:id',
  validate(onlineShopValidation.removeProduct),
  authSeller,
  async (req, res) => {
    try {
      const onlineShop = await OnlineShop.findByIdAndUpdate(
        req.params.id,
        { $pull: { product: req.body.product } },
        {
          new: true,
        }
      );
      await onlineShop.save();
      res.send(onlineShop);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

router.delete('/onlineShop/:id', validate(onlineShopValidation.deleteOnlineShop), authSeller, async (req, res) => {
  try {
    const onlineShop = await OnlineShop.findByIdAndDelete(req.params.id);
    if (!onlineShop) {
      return res.status(404).send('not found');
    }
    res.status(200).send(onlineShop);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete(
  '/onlineShop-admin/:id',
  validate(onlineShopValidation.deleteOnlineShopByAdmin),
  authAdmin,
  async (req, res) => {
    try {
      const onlineShop = await OnlineShop.findById(req.params.id);
      if (!onlineShop) {
        return res.status(404).send('not found');
      }
      if (onlineShop.product !== []) {
        return res.status(400).send('not autherizod to delete running shop');
      }
      const result = await OnlineShop.deleteOne(onlineShop);
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
