const whiteList = [
  'https://www.search-news.students.nomoreparties.space',
  'https://search-news.students.nomoreparties.space',
  'https://turtle-hobbit.github.io/news-explorer-frontend',
  'https://turtle-hobbit.github.io',
  'http://localhost:8080',
  'http://localhost:8081',
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
