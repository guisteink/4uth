const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth") ?? {};

export function generateToken(params:any){
  return jwt.sign(params, secret, {
    expiresIn: 86400
  });
}

export async function authenticate(req: any, res: any, next:any) {
  const { authorization } = req.headers ?? {};

  if (!authorization) return res.status(401).send({ error: "No token provided" });

  const parts = authorization.split(" ");

  if (parts.length !== 2) return res.status(401).send({ error: "Token parts error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: "Token malformatted" });

  jwt.verify(token, secret, (err:any, decoded:any) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  });
}
