const Router = require('koa-router');
const jwt = require('koa-jwt');
const UserCtl = require('../controller/user');
const router = new Router({ prefix: '/user' });
const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', auth, new UserCtl().findUser);

router.get('/:id', auth, new UserCtl().findById);

router.post('/login', new UserCtl().login)

router.post('/register', new UserCtl().createUser);

router.patch('/update/:id', auth, new UserCtl().checkOwner,  new UserCtl().updateUser);

router.post('/delete/:id', );

module.exports = router;