const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

const errorMessages = {
  notFound: {
    resource: 'Запрашиваемый ресурс не найден',
    user: 'Пользователь не найден',
    articles: 'Статьи не найдены',
    articleId: 'Нет статьи с таким ID',
  },
  badRequest: {
    incorrectData: 'Переданы некорректные данные',
    incorrectPassword: 'Пароль должен быть не менее 8 символов и состоять из цифр или строчных, заглавных букв латинского алфавита без пробелов',
    emailExists: 'Введенный email уже существует',
    invalidURL: 'Невалидный URL',
  },
  authorisationError: {
    authentication: 'Неправильный логин или пароль',
    noDataAvailable: 'Введите логин и пароль',
    unauthorizedUser: 'Необходима авторизация',
  },
  forbiddenError: {
    unavailableArticle: 'Нельзя удалить чужую статью',
  },
  serverError: 'На сервере произошла ошибка',
};

// Ошибки 404
const errorNotFoundResource = new NotFoundError(errorMessages.notFound.resource);
const errorNotFoundArticles = new NotFoundError(errorMessages.notFound.articles);
const errorNotFoundArticleId = new NotFoundError(errorMessages.notFound.articleId);
const errorNotFoundUser = new NotFoundError(errorMessages.notFound.user);

// Ошибки 400
const errorIncorrectData = new BadRequestError(errorMessages.badRequest.incorrectData);
const errorIncorrectPassword = new BadRequestError(errorMessages.badRequest.incorrectPassword);
const errorEmailExists = new BadRequestError(errorMessages.badRequest.emailExists);
const errorInvalidURL = new BadRequestError(errorMessages.badRequest.invalidURL);

// Ошибки 401
const errorAuthentication = new UnauthorizedError(errorMessages.authorisationError.authentication);
const errorNoDataAvailable = new UnauthorizedError(
  errorMessages.authorisationError.noDataAvailable,
);
const errorUnauthorizedUser = new UnauthorizedError(
  errorMessages.authorisationError.unauthorizedUser,
);

// Ошибки 403 и 500
const errorUnavailableArticle = new ForbiddenError(errorMessages.forbiddenError.unavailableArticle);
const errorServer = errorMessages.serverError;

module.exports = {
  errorNotFoundArticles,
  errorNotFoundArticleId,
  errorIncorrectData,
  errorNotFoundUser,
  errorNoDataAvailable,
  errorIncorrectPassword,
  errorEmailExists,
  errorInvalidURL,
  errorUnavailableArticle,
  errorUnauthorizedUser,
  errorAuthentication,
  errorNotFoundResource,
  errorServer,
};
