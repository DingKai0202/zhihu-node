const Answer = require('../models/answers');
const User = require('../models/users');

class AnswersCtl {

  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Answer
        .find({ $or: [{ content: q, questionId: ctx.params.questionId }] })
        .limit(perPage)
        .skip(page * perPage);
  }

  async checkAnswerExist(ctx, next) {
    const answer = await Answer.findById(ctx.params.id).select('+answerer');
    if (!answer) { ctx.throw(404,'答案不存在'); }
    if (answer.questionId !== ctx.params.questionId) {
      ctx.throw(404, '该问题下没有此答案');
    }
    await next();
  }

  async checkAnswerer(ctx, next) {
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => " +" + f ).join('');
    const answer = await Answer.findById(ctx.params.id).select(selectFields).populate('answerer');
    if (answer.answerer._id.toString() !== ctx.state.user._id) { ctx.throw('没有权限') };
    await next();
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => " +" + f ).join('');
    const answer = await Answer.findById(ctx.params.id).select(selectFields).populate('answerer');
    ctx.body = answer;
  }

  async create(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true }
    });
    const answer = await new Answer({ 
        ...ctx.request.body, 
        answerer: ctx.state.user._id, 
        questionId: ctx.params.questionId
      }).save();
    ctx.body = answer;
  }

  async update(ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false }
    });
    const answer = await Answer.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    ctx.body = answer;
  }

  async delete(ctx) {
    const answer = await Answer.findByIdAndRemove(ctx.params.id);
    ctx.body = answer;
  }

  async listAnswers(ctx) {
    const answers = await Answer.find({ answerer: ctx.params.id });
    ctx.body = answers;
  }

}

module.exports = AnswersCtl;