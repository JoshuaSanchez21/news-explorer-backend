const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().min(2).max(30).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const articleSchema = Joi.object({
  keyword: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  date: Joi.string().required(),
  source: Joi.string().required(),
  link: Joi.string().uri().required(),
  image: Joi.string().uri().required(),
});

const articleIdSchema = Joi.object({
  articleId: Joi.string().hex().length(24).required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  articleSchema,
  articleIdSchema,
};
