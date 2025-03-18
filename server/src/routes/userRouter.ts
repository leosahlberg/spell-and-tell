import Express, { Request, Response } from "express";
import { userModel } from "../database/models/userModel";
import { encryptPassword } from "../auth/encryptPassword";

export function userRouter() {
  const router = Express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { name, username, email, password } = req.body;
      const hashedPassword = await encryptPassword(password);
      const newUser = await userModel.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      newUser.save();
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(404).send({ message: "User registration failed." });
      console.log(error);
      res.end();
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await userModel.find({});
      if (!users) {
        res.status(404).send({ message: "No users found." });
      }

      const mappedUsers = users.map((user) => {
        return {
          userId: user._id,
          name: user.name,
        };
      });
      res.status(200).send(mappedUsers);
    } catch (error) {
      res.status(500).send({ message: "Server error." });
      console.log(error);
      res.end();
    }
  });

  return router;
}
