const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/users');

routerUsers.get('/me/', celebrate({
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
}), getUser);

module.exports = routerUsers;
