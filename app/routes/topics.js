const Router = require('koa-router');
const jwt = require('koa-jwt');
const TopicCtl = require('../controller/topics');
const router = new Router({ prefix: '/topics' });
const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', new TopicCtl().find);

router.post('/', auth, new TopicCtl().create);

router.get('/:id', new TopicCtl().findById);

router.patch('/update/:id', auth, new TopicCtl().update);


module.exports = router;