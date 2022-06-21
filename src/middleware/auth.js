const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysignatured');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Not found');
    }

    if (user.role !== 'Admin') {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

const authSeller = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysignatured');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Not found');
    }

    if (user.role !== 'Seller') {
      return res.status(401).send({ message: 'Not a User' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

const authCustomer = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysignatured');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Not found');
    }

    if (user.role !== 'Customer') {
      return res.status(401).send({ message: 'Not a User' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

const authSellerOrAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysignatured');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Not found');
    }

    if (user.role !== 'Seller' && user.role !== 'Admin') {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

const authSellerOrCustomer = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysignatured');

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('Not found');
    }

    if (user.role !== 'Seller' && user.role !== 'Customer') {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate' });
  }
};

module.exports = {
  authAdmin,
  authSeller,
  authCustomer,
  authSellerOrAdmin,
  authSellerOrCustomer,
};
