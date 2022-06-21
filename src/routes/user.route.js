const express = require('express');

const { authSeller, authAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const userValidation = require('../validations/user.validation');
const User = require('../models/user.model');

const router = new express.Router();

router.post('/user', validate(userValidation), async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/user/login', validate(userValidation.login), async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/user/admin-login', validate(userValidation.login), async (req, res) => {
  try {
    const user = await User.findByCredentialsAdmin(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/user/logout', authSeller, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/user/admin-logout', authAdmin, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/user/logoutAll', authSeller, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/user/me', authSeller, async (req, res) => {
  res.send(req.user);
});

router.get('/user', validate(userValidation.getUsers), authAdmin, async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/user/:id', validate(userValidation.getUser), authSeller, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(203).send();
  }
});

router.patch('/user/:id', validate(userValidation.updateUser), authSeller, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/user/me', authSeller, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/user/:id', validate(userValidation.deleteUser), authSeller, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
