const Router = require('koa-router');
const router = new Router();
const HomeCtl = require('../controller/home');

router.post('/upload', new HomeCtl().upload);

module.exports = router;