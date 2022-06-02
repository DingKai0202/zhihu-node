const Question = require('../models/questions');
const User = require('../models/users');

class QuestionsCtl {

  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    ctx.body = await Question
        .find({ $or: [{ title: q }, { descriptioin: q }] })
        .limit(perPage)
        .skip(page * perPage);
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => " +" + f ).join('');
    const question = await Question.findById(ctx.params.id).select(selectFields).populate('questioner topics');
    ctx.body = question;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      descriptioin: { type: 'string', required: false },
      topic: { type: 'array', required: false }
    });
    const question = await new Question({ ...ctx.request.body, questioner: ctx.state.user._id}).save();
    ctx.body = question;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      descriptioin: { type: 'string', required: false },
      topic: { type: 'array', required: false }
    });
    const question = await Question.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    ctx.body = question;
  }

  async delete(ctx) {
    const question = await Question.findByIdAndRemove(ctx.params.id);
    ctx.body = question;
  }

  async checkQuestioner(ctx, next) {
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => " +" + f ).join('');
    const question = await Question.findById(ctx.params.id).select(selectFields).populate('questioner');
    if (question.questioner._id.toString() !== ctx.state.user._id) { ctx.throw('没有权限') };
    await next();
  }

  async checkQuestionExist(ctx, next) {
    const topic = await Question.findById(ctx.params.id).select('+questioner');
    if (!topic) { ctx.throw(404,'问题不存在'); }
    await next();
  }

  async listQuestions(ctx) {
    const questions = await Question.find({ questioner: ctx.params.id });
    ctx.body = questions;
  }

}

module.exports = QuestionsCtl;
