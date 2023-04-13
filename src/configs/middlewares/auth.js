const { expressjwt: jwt } = require("express-jwt");
const { secret } = require("..");

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

// todo: analyze
const auth = {
  required: jwt({
    secret,
    userProperty: "payload",
    algorithms: ["sha512"],
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret,
    userProperty: "payload",
    algorithms: ["sha512"],
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports = auth;
