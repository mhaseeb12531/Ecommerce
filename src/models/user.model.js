const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const enums = require('../utils/enums');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlegth: 8,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('can not contain word password');
        }
      },
    },
    mobile_number: {
      type: Number,
      integer: true,
    },
    age: {
      type: Number,
      integer: true,
    },
    role: {
      type: String,
      default: 'Customer',
      enum: enums.role,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamp: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'mysignatured');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && user.role !== 'Seller' && user.role !== 'Customer') {
    throw new Error('unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    throw new Error('unable to login');
  }
  return user;
};
userSchema.statics.findByCredentialsAdmin = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || user.role !== 'Admin') {
    throw new Error('unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    throw new Error('unable to login');
  }
  return user;
};
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
