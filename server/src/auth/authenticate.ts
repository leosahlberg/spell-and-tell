import jwt, { Secret } from "jsonwebtoken";

export type User = {
  username: string;
};

export type TokenContents = {
  username: string;
};

export function generateToken(user: User): string {
  const tokenContents: TokenContents = {
    username: user.username,
  };

  const secret: Secret = process.env.TOKEN_SECRET!;
  const expiresIn = process.env.TOKEN_EXPIRES || "1800s";

  if (!secret) {
    throw new Error("TOKEN_SECRET är inte definierad i miljövariablerna");
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
      return reject(
        new Error("TOKEN_SECRET är inte definierad i miljövariablerna")
      );
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(new Error("Token är ogiltig eller utgången"));
      }
      resolve(decoded as TokenContents);
    });
  });
}
