const jwt = require('jsonwebtoken');
const { errorUnauthorizedUser } = require('../constants/error-messages');

const { JWT_SECRET = 'dev-secret' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(errorUnauthorizedUser);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(errorUnauthorizedUser);
  }

  req.user = payload;
  next();
};
