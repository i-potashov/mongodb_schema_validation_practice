//TO DO в модули селебрате добавить ошибки на логин и регу

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { DB, PORT } = require('./configuration/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signUpRequestCheck } = require('./modules/validations');

const app = express();
app.use(bodyParser.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', signUpRequestCheck, createUser);
app.use(auth);
app.use(routes);

app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
