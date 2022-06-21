const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    product: Joi.string().custom(objectId),
    quantity: Joi.number().required(),
  }),
};

const getCarts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getValidateCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      product: Joi.string().custom(objectId),
      quantity: Joi.number(),
    })
    .min(0),
};

const deleteCart = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCart,
  getCarts,
  getCart,
  getValidateCart,
  updateCart,
  deleteCart,
};
