const Article = require('../models/article');

const getArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(() => res.status(500).send({
      message: 'Ha ocurrido un error en el servidor',
    }));
};

const createArticle = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Los datos proporcionados no son válidos',
        });
      }

      return res.status(500).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

const deleteArticle = (req, res) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          message: 'Artículo no encontrado',
        });
      }

      if (article.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: 'No tienes permiso para eliminar este artículo',
        });
      }

      return Article.findByIdAndDelete(articleId)
        .then((deletedArticle) => res.send(deletedArticle));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'ID de artículo no válido',
        });
      }

      return res.status(500).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
