const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { promiseHandler } = require('../helpers/helpers');
const {
  errorNotFoundUser,
  errorIncorrectData,
  errorNoDataAvailable,
  errorEmailExists,
} = require('../constants/error-messages');

const { JWT_SECRET = 'dev-secret' } = process.env;

function getUser(req, res, next) {
  promiseHandler(User.findById(req.user._id, { _id: 0 })
    .orFail(errorNotFoundUser), req, res, next);
}

function createUser(req, res, next) {
  const { name } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        email: req.body.email,
        password: hash,
      })
        .then((user) => res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(errorIncorrectData);
          } else if (err.code === 11000) {
            next(errorEmailExists);
          }
        });
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (email.length !== 0 && password.length !== 0) {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );

        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: false,
            secure: false,
          });

        res.send({ data: token });
      })
      .catch((err) => {
        next(err);
      });
  }
  return next(errorNoDataAvailable);
}

module.exports = {
  getUser,
  createUser,
  login,
};
