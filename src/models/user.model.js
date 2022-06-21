const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      validate(value) {
        if (value < 0) {
          throw new Error('enter correct phone number');
        }
      },
    },
    age: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('age must be positive number');
        }
      },
    },
    address: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Address',
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    },
    role: {
      type: String,
      default: 'Customer',
      enum: ['Seller', 'Customer', 'Admin'],
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
  const user = await this.findOne({ email });
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
  const user = await this.findOne({ email });
  if (user && user.role !== 'Admin') {
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
userSchema.pre('remove', async function (next) {
  const user = this;
  await user.deleteOne({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
