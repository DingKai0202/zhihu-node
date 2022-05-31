const Router = require('koa-router');
const router = new Router();
const HomeCtl = require('../controller/home');

router.get('/test', (ctx) => {
  ctx.body = '<h1>这是里交易者主页</h1>'
})

router.post('/upload', new HomeCtl().upload);

module.exports = router;