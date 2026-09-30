const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorized-error');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Se requiere autorización'));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    return next();
  } catch {
    return next(new UnauthorizedError('Token inválido o expirado'));
  }
};

module.exports = auth;
