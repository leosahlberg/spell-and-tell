import Express, { Request, Response } from "express";
import { authenticateUser } from "../auth/authenticate";
import { contributionModel } from "../database/models/contributionModel";

export function contributionRouter() {
  const router = Express.Router();

  router.get(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await contributionModel.find({ storyId: req.params.id });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No contributions found." });
      }
    }
  );

  router.post("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const {storyId, text, userId, numberOfWords, created} = req.body;
      const data = await contributionModel.create({ storyId: storyId, text: text, userId: userId, numberOfWords: numberOfWords, created: created });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ message: "Error: Failed to create story." });
    }
  });

  return router;
}
