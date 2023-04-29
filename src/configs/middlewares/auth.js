const jwt = require("express-jwt");

const { secret } = require("..");

function getTokenFromHeader(req) {
  const authHeader = req?.headers?.authorization ?? {};
  const tokenPrefixes = ["Token", "Bearer"];

  if (
    !authHeader ||
    !tokenPrefixes.some((prefix) => authHeader.startsWith(prefix))
  ) {
    return null;
  }

  return authHeader.split(" ")[1];
}

const auth = {
  required: jwt({
    secret,
    userProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
