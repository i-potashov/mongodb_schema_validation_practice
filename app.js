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

const app = express();
app.use(bodyParser.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(routes);
// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
