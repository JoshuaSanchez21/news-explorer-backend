const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const articlesRouter = require('./routes/articles');

const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./middlewares/error-handler');

const { signupSchema, signinSchema } = require('./validators/schemas');

const { validateBody } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/news-explorer')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('News Explorer API is running');
});

app.post('/signup', validateBody(signupSchema), createUser);
app.post('/signin', validateBody(signinSchema), login);

app.use('/users', auth, usersRouter);
app.use('/articles', auth, articlesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Recurso solicitado no encontrado'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
