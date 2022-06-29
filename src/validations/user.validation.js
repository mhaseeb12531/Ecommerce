const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    age: Joi.number().integer(),
    mobile_number: Joi.number().integer(),
    address: Joi.string().required().custom(objectId),
    cart: Joi.string().custom(objectId),
    role: Joi.string().valid('Customer', 'Seller', 'Admin'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      age: Joi.number().integer(),
      mobile_number: Joi.number().integer(),
      address: Joi.string().custom(objectId),
      cart: Joi.string().custom(objectId),
      role: Joi.string().valid('Customer', 'Seller', 'Admin'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
