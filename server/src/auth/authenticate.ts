import jwt, { Secret } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

export type User = {
  username: string;
  name: string;
};

export type TokenContents = {
  username: string;
  name: string;
};

export function authenticateUser() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      res.sendStatus(401);
      return;
    }

    try {
      const user = await authenticateToken(token);
      res.locals.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.sendStatus(403);
    }
  };
}

export function generateToken(user: User): string {
  const tokenContents: TokenContents = {
    username: user.username,
    name: user.name,
  };

  const secret: Secret = process.env.TOKEN_SECRET!;
  const expiresIn = process.env.TOKEN_EXPIRES || "1800s";

  if (!secret) {
    throw new Error("TOKEN_SECRET not defined");
  }

  return jwt.sign(tokenContents, secret, {
    expiresIn,
    algorithm: "HS256",
  });
}

export function authenticateToken(token: string): Promise<TokenContents> {
  return new Promise((resolve, reject) => {
    const secret: Secret = process.env.TOKEN_SECRET!;

    if (!secret) {
      return reject(new Error("TOKEN_SECRET not defined"));
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(new Error("Token undefiend or expired"));
      }
      resolve(decoded as TokenContents);
    });
  });
}
