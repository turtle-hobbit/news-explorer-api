const router = require('express').Router();
const routerAuth = require('./authorization');
const routerUsers = require('./users');
const routerArticles = require('./articles');
const auth = require('../middlewares/auth');

router.use(routerAuth);
router.use(auth);
router.use('/articles', routerArticles);
router.use('/users', routerUsers);

module.exports = router;
