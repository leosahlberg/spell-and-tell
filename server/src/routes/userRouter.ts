import Express from "express";
import { userModel } from "../database/models/userModel";
import { encryptPassword } from "../auth/encryptPassword";

export function userRouter() {
  const router = Express.Router();

  router.post("/", async (req, res) => {
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

  return router;
}
