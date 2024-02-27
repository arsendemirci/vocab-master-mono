module.exports = {
  statusCode: {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    ACCESS_DENIED: 401,
    SERVER_ERROR: 500,
    CUSTOM_ERROR: 501,
  },
  errorCode: {
    INVALID_TOKEN: { error: { code: 600, msg: "Invalid Access Token!" } },
    ACCESS_TOKEN_NOT_FOUND: {
      error: {
        code: 603,
        msg: "No refresh token is provided within the request body!",
      },
    },
    TOKEN_NOT_FOUND: {
      error: {
        code: 604,
        msg: "No token is provided within the request header!",
      },
    },
    EXPIRED_TOKEN: { error: { code: 601, msg: "Access Token has expired!" } },
    INVALID_REFRESH_TOKEN: {
      error: { code: 602, msg: "Invalid Refresh Token!" },
    },
    INVALID_EMAIL: { error: { code: 401, msg: "Invalid E-mail" } },
    INVALID_PASSWORD: { error: { code: 402, msg: "Invalid Password" } },
    REGISTERED_EMAIL: {
      error: { code: 403, msg: "Email is already registered!" },
    },
    ACCOUNT_NOT_VERIFIED: {
      error: { code: 404, msg: "Account is not verified" },
    },
    REGISTER_FAIL: {
      error: { code: 405, msg: "Failed to register the user" },
    },
    CODE_EXPIRED: {
      error: { code: 406, msg: "Verification code is expired" },
    },
    INVALID_CODE: {
      error: { code: 407, msg: "Verification code is incorrect!" },
    },
  },
  tokenStatus: {
    INVALID: "invalid",
    EXPIRED: "expired",
    OK: "ok",
  },
};
