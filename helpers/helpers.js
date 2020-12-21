const validator = require('validator');
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

module.exports = {
  promiseHandler,
  deleteHandler,
  validUrl,
};
