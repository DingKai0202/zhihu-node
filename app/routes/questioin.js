const Router = require('koa-router');
const jwt = require('koa-jwt');
const QuestionCtl = require('../controller/questions');
const router = new Router({ prefix: '/question' });
const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/', new QuestionCtl().find);

router.post('/', auth, new QuestionCtl().create);

router.get('/:id', new QuestionCtl().checkQuestionExist, new QuestionCtl().findById);

router.patch('/update/:id', auth, new QuestionCtl().checkQuestionExist,new QuestionCtl().checkQuestioner, new QuestionCtl().update);

router.delete('/delete/:id', auth, new QuestionCtl().checkQuestionExist,new QuestionCtl().checkQuestioner, new QuestionCtl().delete);



module.exports = router;
