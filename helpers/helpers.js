const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { errorInvalidURL, errorUnavailableArticle } = require('../constants/error-messages');

const validUrl = (url) => {
  if (!validator.isURL(url)) {
    throw errorInvalidURL;
  } else {
    return url;
  }
};

const promiseHandler = (promise, req, res, next) => {
  promise
    .then((object) => res.send({ data: object }))
    .catch(next);
};

const deleteHandler = (promise, req, res, next) => {
  promise
    .then((object) => {
      const userId = req.user._id;

      if (object.owner.equals(userId)) {
        object.deleteOne().then(() => res.send({ data: object }));
      } else {
        throw errorUnavailableArticle;
      }
    })
    .catch(next);
};

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
});

const checkSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
});

module.exports = {
  promiseHandler,
  deleteHandler,
  validUrl,
  checkSignIn,
  checkSignUp,
};
