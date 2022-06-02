const Router = require('koa-router');
const jwt = require('koa-jwt');
const AnswersCtl = require('../controller/answers');
const router = new Router({ prefix: '/answers' });
const { secret } = require('../config');

const auth = jwt({ secret });

router.get('/:questionId/question', new AnswersCtl().find);

router.post('/:questionId/question', auth, new AnswersCtl().create);

router.get('/:id', new AnswersCtl().findById);

router.patch('/update/:id', auth, new AnswersCtl().checkAnswerExist, new AnswersCtl().checkAnswerer, new AnswersCtl().update);

router.delete('/delete/:id', auth, new AnswersCtl().checkAnswerExist, new AnswersCtl().checkAnswerer, new AnswersCtl().delete);



module.exports = router;