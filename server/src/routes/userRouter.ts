import Express, { Request, Response } from "express";
import { userModel } from "../database/models/userModel";
import { encryptPassword } from "../auth/encryptPassword";
import { authenticateUser } from "../auth/authenticate";

export function userRouter() {
  const router = Express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { name, username, email, password, imgUrl } = req.body;
      const hashedPassword = await encryptPassword(password);
      const newUser = await userModel.create({
        name,
        username,
        email,
        password: hashedPassword,
        imgUrl: "",
      });

      newUser.save();
      res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(404).send({ message: "User registration failed." });
      console.log(error);
      res.end();
    }
  });

  router.get("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const users = await userModel.find({});
      if (!users) {
        res.status(404).send({ message: "No users found." });
      }

      const mappedUsers = users.map((user) => {
        return {
          userId: user._id,
          name: user.name,
          imgUrl: user.imgUrl,
        };
      });
      res.status(200).send(mappedUsers);
    } catch (error) {
      res.status(500).send({ message: "Server error." });
      console.log(error);
      res.end();
    }
  });

  router.put(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const { imgUrl, name, email } = req.body;
        const user = await userModel.findByIdAndUpdate(
          req.params.id,
          { $set: { imgUrl: imgUrl, name: name, email: email } },
          { new: true }
        );

        res.status(200);
        res.send({
          userId: user?._id,
          username: user?.username,
          name: user?.name,
          email: user?.email,
          imgUrl: user?.imgUrl,
        });
      } catch (error) {
        res.status(500).send({ message: "Not found" });
        console.log(error);
        res.end();
      }
    }
  );

  return router;
}
