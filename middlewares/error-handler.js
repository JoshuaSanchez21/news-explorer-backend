const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? 'Ha ocurrido un error en el servidor'
        : message,
  });
};

module.exports = errorHandler;
