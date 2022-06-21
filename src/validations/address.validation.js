const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAddress = {
  body: Joi.object().keys({
    houseNo: Joi.string().required().trim(),
    street: Joi.string().required(),
    area: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    defaultAddress: Joi.boolean().required(),
  }),
};

const getAddresses = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      houseNo: Joi.string().required().trim(),
      street: Joi.string(),
      area: Joi.string().optional(),
      city: Joi.string(),
      state: Joi.string(),
      defaultAddress: Joi.boolean(),
    })
    .min(1),
};

const deleteAddress = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
};
