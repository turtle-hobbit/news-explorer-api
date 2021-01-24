require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./helpers/error-handler');
const limiter = require('./helpers/rate-limiter');
const { errorNotFoundResource } = require('./constants/error-messages');

const app = express();
const { PORT = 3000 } = process.env;
const { MONGO_SERVER = 'mongodb://localhost:27017/diploma' } = process.env;

mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const whiteList = [
  'http://127.0.0.1:5500',
  'https://turtle-hobbit.github.io/news-explorer-frontend',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'version',
    'authorization',
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use((req, res, next) => next(errorNotFoundResource));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
