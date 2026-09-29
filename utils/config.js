const { NODE_ENV, JWT_SECRET } = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in production');
}

module.exports = {
  NODE_ENV,
  JWT_SECRET: JWT_SECRET || 'dev-secret-key',
};
