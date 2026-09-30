const router = require('express').Router();

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const { articleSchema, articleIdSchema } = require('../validators/schemas');

const { validateBody, validateParams } = require('../middlewares/validation');

router.get('/', getArticles);

router.post('/', validateBody(articleSchema), createArticle);

router.delete('/:articleId', validateParams(articleIdSchema), deleteArticle);

module.exports = router;
