const errorCode = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const USER_TYPES = {
  USER: "user",
  ADMIN: "admin",
};

module.exports = { errorCode, USER_TYPES };
