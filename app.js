const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const { MONGODB_URI } = require('./utils/config');

const NotFoundError = require('./errors/not-found-error');
const errorHandler = require('./middlewares/error-handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get('/', (req, res) => {
  res.send('News Explorer API is running');
});

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Recurso solicitado no encontrado'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
