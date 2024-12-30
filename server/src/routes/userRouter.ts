import Express from "express";
import { userModel } from "../database/models/userModel";
import { encryptPassword } from "../auth/encryptPassword";

export function userRouter() {
  const router = Express.Router();

  router.get("/", async (req, res) => {
    try {
      const data = await userModel.find({});
      res.status(200).send(data);
    } catch (error) {
      console.log("error..");
      res.sendStatus(404);
      res.end();
    }
  });

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
      res.status(201).send(newUser);
    } catch (error) {
      res.sendStatus(404);
      console.log(error);
      res.end();
    }
  });

  router.get("/:id", async (req, res) => {
    const data = await userModel.findOne({ _id: req.params.id });
    res.send(data);
  });

  router.delete("/:id", async (req, res) => {
    await userModel.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  });

  return router;
}
