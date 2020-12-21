require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const routerAuth = require('./routes/authorization');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const mongoServer = require('./config/config');
const errorHandler = require('./helpers/error-handler');
const limiter = require('./helpers/rate-limiter');
const { errorNotFoundResource } = require('./constants/error-messages');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(mongoServer, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(routerAuth);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => next(errorNotFoundResource));
app.use(errorHandler);

app.listen(PORT);
