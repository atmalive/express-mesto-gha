module.exports.ERRORS = {
  NOT_FOUND: {
    ERROR_CODE: 404,
    CARDS: 'Карточка с указанным _id не найдена.',
    CARDS_LIKE: 'Передан несуществующий _id карточки.',
    USER: 'Пользователь по указанному _id не найден.',
    BAD_WAY: 'Неправильный путь',
    USER_ID: 'Пользователь по указанному _id не найден.',
    // USER_ME: 'Пользователь с указанным _id не найден.',
    // USER_AVATAR: 'Пользователь с указанным _id не найден.'
  },
  VALIDATION: {
    ERROR_CODE: 400,
    CARDS: 'Переданы некорректные данные в методы создания карточки.',
    CARDS_LIKE: 'Переданы некорректные данные для постановки/снятии лайка.',
    USER: 'Переданы некорректные данные при создании пользователя.',
    USER_ME: 'Переданы некорректные данные при обновлении профиля.',
    USER_AVATAR: 'Переданы некорректные данные при обновлении аватара.',
    GENERAL: 'Переданы некорректные данные',
  },

  DEFAULT_ERROR: {
    ERROR_CODE: 500,
    CARDS: 'Ошибка по-умолчанию.',
    USER: 'Ошибка по-умолчанию.',
  },
  AUNTIFICATION_ERROR: {
    ERROR_CODE: 401,
    USER_ERROR: 'Ошибка авторизации.',
  },
  NO_RIGHT: {
    ERROR_CODE: 403,
    USER_ERROR: 'Нет прав.',
  },
  IS_USER: {
    ERROR_CODE: 409,
    USER_ERROR: 'Такой пользователь уже зареган.',
  },
};

module.exports.MONGOOSE_ERR = {
  VALIDERR: 'ValidationError',
  CASTERR: 'CastError',
};
