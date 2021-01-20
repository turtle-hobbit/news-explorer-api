const Article = require('../models/article');
const { promiseHandler, deleteHandler } = require('../helpers/helpers');
const {
  errorNotFoundArticles,
  errorNotFoundArticleId,
  errorIncorrectData,
} = require('../constants/error-messages');

function getArticles(req, res, next) {
  const userId = req.user._id;

  promiseHandler(Article.find({ owner: userId })
    .orFail(errorNotFoundArticles), req, res, next);
}

function createArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(errorIncorrectData);
      } else {
        next(err);
      }
    });
}

function deleteArticleById(req, res, next) {
  const { articleId } = req.params;
  deleteHandler(Article.findById(articleId)
    .select('+owner')
    .orFail(errorNotFoundArticleId)
    .catch((err) => {
      if (err.name === 'CastError') {
        throw errorIncorrectData;
      }
      throw err;
    }), req, res, next);
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticleById,
};
