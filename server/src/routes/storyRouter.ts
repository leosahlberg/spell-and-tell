import Express, { Request, Response } from "express";
import { storyModel } from "../database/models/storyModel";
import { authenticateUser } from "../auth/authenticate";
import { rouleSetModel } from "../database/models/roulesetModel";

export function storyRouter() {
  const router = Express.Router();

  router.get("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await storyModel.find({});
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ message: "No stories found." });
    }
  });

  router.get(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await storyModel.find({ _id: req.params.id });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No stories found." });
      }
    }
  );

  router.get(
    "/user/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await storyModel.find({ userId: req.params.id });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No stories found." });
      }
    }
  );

  router.post("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const { title, userId, rouleSetId, imgUrl, text } = req.body;
      let roulesetid = rouleSetId ? rouleSetId : "679a4ef2ea87678a17120a49";
      const date = new Date();
      const data = await storyModel.create({
        title: title,
        created: date,
        userId: userId,
        rouleSetId: roulesetid,
        imgUrl: imgUrl,
        contributions: [
          {
            text: text,
            userId: userId,
          },
        ],
      });
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "Error: Failed to create story." });
    }
  });

  router.put(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const { status } = req.body;
        const data = await storyModel.findByIdAndUpdate(
          req.params.id,
          { $set: { status: status } },
          { new: true }
        );
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "Error: Failed to update story." });
      }
    }
  );

  return router;
}
