const jwt = require("jsonwebtoken");
const { secret } = require("../../config/auth.json");
const { Request, Response, NextFunction } = require("express");
const IJWTPayload = require("../models/interfaces/jwt-payload");
const { NotFoundError } = require("../models/errors/notfound.error");
const { UnauthorizedError } = require("../models/errors/unauthorized.error");
const { BadRequestError } = require("../models/errors/badrequest.error");

export function generateToken(params: typeof IJWTPayload){
  return jwt.sign(params, secret, {
    expiresIn: 86400,
  });
}

export function isAuthenticate(req: typeof Request, res: typeof Response, next: typeof NextFunction): void {
  const authorization  = req?.headers?.authorization ?? "";

  if (!authorization) return res.status(401).send(new UnauthorizedError("No token provided"));

  const parts = authorization.split(" ");

  if (parts.length !== 2) return res?.status(400).send(new BadRequestError("Token parts error"));

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res?.status(401).send(new BadRequestError("Badly formatted token"));

  jwt.verify(token, secret, (err:any, decoded:any) => {
    if (err) return res?.status(401).send(new UnauthorizedError("Token invalid"));

    req.userId = decoded.id;
    return next;
  });
}
