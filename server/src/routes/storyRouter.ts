import Express, { Request, Response } from "express";
import { storyModel } from "../database/models/storyModel";
import { authenticateUser } from "../auth/authenticate";

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
      const {
        title,
        userId,
        imgUrl,
        text,
        numberOfContributors,
        maxNumberOfWordsPerContribution,
        maxTime,
        spellChecking,
        scoring,
      } = req.body;

      const date = new Date();
      const data = await storyModel.create({
        title: title,
        created: date,
        userId: userId,
        imgUrl: imgUrl,
        contributions: [
          {
            text: text,
            userId: userId,
          },
        ],

        numberOfContributors: numberOfContributors,
        maxNumberOfWordsPerContribution: maxNumberOfWordsPerContribution,
        maxTime: maxTime,
        spellChecking: spellChecking,
        scoring: scoring,
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

  router.delete(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response): Promise<void> => {
      try {
        const deletedStory = await storyModel.findByIdAndDelete(req.params.id);

        if (!deletedStory) {
          res.status(404).send({ message: "Story not found" });
          return;
        }

        res.status(200).send({ message: "Story deleted successfully" });
      } catch (error) {
        console.error("Error deleting story:", error);
        res.status(500).send({ message: "Error: Failed to delete story" });
      }
    }
  );

  return router;
}
