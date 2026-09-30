const router = require('express').Router();

const usersRouter = require('./users');
const articlesRouter = require('./articles');

const { createUser, login } = require('../controllers/users');

const auth = require('../middlewares/auth');

const { signupSchema, signinSchema } = require('../validators/schemas');

const { validateBody } = require('../middlewares/validation');

router.post('/signup', validateBody(signupSchema), createUser);

router.post('/signin', validateBody(signinSchema), login);

router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

module.exports = router;
