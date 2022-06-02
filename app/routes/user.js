const Router = require('koa-router');
const jwt = require('koa-jwt');
const UserCtl = require('../controller/user');
const TopicsCtl = require('../controller/topics');
const QuestionCtl = require('../controller/questions');
const router = new Router({ prefix: '/user' });
const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', auth, new UserCtl().findUser);

router.get('/:id', auth, new UserCtl().findById);

router.post('/login', new UserCtl().login)

router.post('/register', new UserCtl().createUser);

router.patch('/update/:id', auth, new UserCtl().checkOwner,  new UserCtl().updateUser);

router.post('/delete/:id', );

router.get('/:id/following', new UserCtl().listFollowing);

router.put('/following/:id', auth,new UserCtl().checkUserExist, new UserCtl().follow);

router.delete('/following/:id', auth, new UserCtl().checkUserExist, new UserCtl().unfollow);

router.get('/:id/fans', new UserCtl().listFans);

router.get('/:id/followingTopics', new TopicsCtl().listFollowingTopics);

router.put('/followingTopics/:id', auth,new TopicsCtl().checkTopicExist, new TopicsCtl().followTopic);

router.delete('/followingTopics/:id', auth, new TopicsCtl().checkTopicExist, new TopicsCtl().unfollowTopic);

router.get('/:id/questions', new QuestionCtl().listQuestions);

module.exports = router;