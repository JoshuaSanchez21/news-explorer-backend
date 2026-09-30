const BadRequestError = require('../errors/bad-request-error');

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(new BadRequestError('Los datos proporcionados no son válidos'));
  }

  req.body = value;

  return next();
};

const validateParams = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params);

  if (error) {
    return next(
      new BadRequestError('Los parámetros proporcionados no son válidos'),
    );
  }

  req.params = value;

  return next();
};

module.exports = {
  validateBody,
  validateParams,
};
