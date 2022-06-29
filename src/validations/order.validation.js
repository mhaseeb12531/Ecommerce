const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    bill: Joi.number().required(),
    onlineShop: Joi.string().custom(objectId),
    address: Joi.string().custom(objectId),
    order_details: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.string().custom(objectId),
      bill: Joi.number(),
      onlineShop: Joi.string().custom(objectId),
      address: Joi.string().custom(objectId),
      order_details: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(0),
};

const deleteOrder = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
