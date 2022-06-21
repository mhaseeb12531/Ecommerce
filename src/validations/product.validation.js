const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
    description: Joi.string().optional(),
    onlineShop: Joi.string().custom(objectId),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number(),
      status: Joi.string(),
      description: Joi.string(),
      onlineShop: Joi.string().custom(objectId),
    })
    .min(0),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
