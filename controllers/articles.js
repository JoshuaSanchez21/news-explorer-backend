const Article = require('../models/article');

const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

const getArticles = (req, res, next) => Article.find({ owner: req.user._id })
  .then((articles) => res.send(articles))
  .catch(next);

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      const articleData = article.toObject();

      delete articleData.owner;

      return res.status(201).send(articleData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Los datos proporcionados no son válidos'),
        );
      }

      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  return Article.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Artículo no encontrado');
      }

      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          'No tienes permiso para eliminar este artículo',
        );
      }

      return Article.findByIdAndDelete(articleId);
    })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID de artículo no válido'));
      }

      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
