// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
// import { secret } from "../../config/auth.json";
const { secret } = require("../../config/auth.json");
// import { Request, Response, NextFunction } from "express";
const { Request, Response, NextFunction } = require("express");

export function generateToken(params:any){
  return jwt.sign(params, secret, {
    expiresIn: 86400,
  });
}

export async function authenticate(req: typeof Request, res: typeof Response, next: typeof NextFunction) {
  const authorization  = req.headers.authorization ?? "";

  if (!authorization) return res.status(401).send({ error: "No token provided" });

  const parts = authorization.split(" ");

  if (parts.length !== 2) return res.status(401).send({ error: "Token parts error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: "Badly formatted token" });

  jwt.verify(token, secret, (err:any, decoded:any) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  });
}
