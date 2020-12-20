const router = require('express').Router();
const routerUsers = require('./users');
const routerArticles = require('./articles');

router.use('/articles', routerArticles);
router.use('/users', routerUsers);

module.exports = router;
