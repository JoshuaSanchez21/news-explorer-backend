const { NODE_ENV, JWT_SECRET, MONGODB_URI } = process.env;

const isProduction = NODE_ENV === 'production';

if (isProduction && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in production');
}

if (isProduction && !MONGODB_URI) {
  throw new Error('MONGODB_URI must be defined in production');
}

module.exports = {
  NODE_ENV,
  JWT_SECRET: JWT_SECRET || 'dev-secret-key',
  MONGODB_URI: MONGODB_URI || 'mongodb://127.0.0.1:27017/news-explorer',
};
