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
        object.deleteOne()
          .then((article) => res.send({
            _id: article._id,
            keyword: article.keyword,
            title: article.title,
            text: article.text,
            date: article.date,
            source: article.source,
            link: article.link,
            image: article.image,
          }));
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
