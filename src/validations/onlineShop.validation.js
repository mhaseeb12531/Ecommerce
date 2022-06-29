const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOnlineShop = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    product: Joi.string().custom(objectId).required(),
    user: Joi.string().custom(objectId).required(),
  }),
};

const getAllOnlineShopes = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOnlineShop = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getOnlineShopByUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const updateOnlineShop = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      category: Joi.string(),
      product: Joi.string().custom(objectId).required(),
      user: Joi.string().custom(objectId),
    })
    .min(1),
};
const addProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    product: Joi.string().custom(objectId).required(),
  }),
};
const removeProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const deleteOnlineShop = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const deleteOnlineShopByAdmin = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOnlineShop,
  getOnlineShop,
  getAllOnlineShopes,
  getOnlineShopByUser,
  updateOnlineShop,
  addProduct,
  removeProduct,
  deleteOnlineShop,
  deleteOnlineShopByAdmin,
};
