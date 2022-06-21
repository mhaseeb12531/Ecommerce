const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrderDetails = {
  body: Joi.object().keys({
    order_id: Joi.string().custom(objectId),
    product: Joi.string().custom(objectId),
    quantity: Joi.number().required(),
  }),
};

const getAllOrderDetails = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrderDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateOrderDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      order_id: Joi.string().custom(objectId),
      product: Joi.string().custom(objectId),
      quantity: Joi.number(),
    })
    .min(0),
};

const deleteOrderDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrderDetails,
  getAllOrderDetails,
  getOrderDetails,
  updateOrderDetails,
  deleteOrderDetails,
};
