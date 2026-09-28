const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Los datos proporcionados no son válidos',
        });
      }

      if (err.code === 11000) {
        return res.status(409).send({
          message: 'Ya existe un usuario con este correo electrónico',
        });
      }

      return res.status(500).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('INVALID_CREDENTIALS'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('INVALID_CREDENTIALS'));
        }

        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'INVALID_CREDENTIALS') {
        return res.status(401).send({
          message: 'Correo electrónico o contraseña incorrectos',
        });
      }

      return res.status(500).send({
        message: 'Ha ocurrido un error en el servidor',
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Usuario no encontrado',
        });
      }

      return res.send(user);
    })
    .catch(() => res.status(500).send({
      message: 'Ha ocurrido un error en el servidor',
    }));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
