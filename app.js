const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const articlesRouter = require('./routes/articles');

const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./middlewares/error-handler');

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

app.get('/', (req, res) => {
  res.send('News Explorer API is running');
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/users', auth, usersRouter);
app.use('/articles', auth, articlesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Recurso solicitado no encontrado'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
