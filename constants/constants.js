const whiteList = [
  'http://127.0.0.1:5500',
  'https://turtle-hobbit.github.io',
  'https://turtle-hobbit.github.io/news-explorer-frontend',
];

const corsOptions = {
  origin: whiteList,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'origin',
    'x-access-token',
    'accept',
  ],
  credentials: true,
};

module.exports = { corsOptions };
