const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const articlesRouter = require('./routes/articles');

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

app.use(auth);

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
