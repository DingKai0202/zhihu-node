const Router = require('koa-router');
const jwt = require('koa-jwt');
const TopicCtl = require('../controller/topics');
const router = new Router({ prefix: '/topics' });
const { secret } = require('../config');
const QuestionsCtl = require('../controller/questions');

const auth = jwt({ secret });

router.get('/', new TopicCtl().find);

router.post('/', auth, new TopicCtl().create);

router.get('/:id', new TopicCtl().checkTopicExist, new TopicCtl().findById);

router.patch('/update/:id', auth, new TopicCtl().checkTopicExist, new TopicCtl().update);

router.get('/:id/followers', new TopicCtl().checkTopicExist, new TopicCtl().listTopicFollowers);

router.get('/:id/questions', new TopicCtl().checkTopicExist, new TopicCtl().listQuestions);

module.exports = router;
