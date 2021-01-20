const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validUrl } = require('../helpers/helpers');
const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');

routerArticles.get('/', celebrate({
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
}), getArticles);

routerArticles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validUrl),
    image: Joi.string().required().custom(validUrl),
  }),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
}), createArticle);

routerArticles.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex(),
  }),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
}), deleteArticleById);

module.exports = routerArticles;
