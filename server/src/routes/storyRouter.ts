import Express, { Request, Response } from "express";
import { storyModel } from "../database/models/storyModel";
import { authenticateUser } from "../auth/authenticate";

export function storyRouter() {
  const router = Express.Router();

  router.get("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await storyModel
        .find({ public: true })
        .populate({ path: "userId", select: "name" })
        .populate({ path: "contributions.userId", select: "name" });

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
        const data = await storyModel
          .find({ _id: req.params.id })
          .populate({ path: "userId", select: "name" })
          .populate({ path: "contributions.userId", select: "name" });
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
        const data = await storyModel
          .find({ userId: req.params.id })
          .populate({ path: "userId", select: "name" })
          .populate({ path: "contributions.userId", select: "name" });
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
        score,
        publicStory,
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
        score: score,
        public: publicStory,
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
        const { id } = req.params;
        const { text, userId, score } = req.body;

        const story = await storyModel.findById(id);
        if (!story) {
          res.status(404).json({ message: "Story not found" });
          return;
        }
        story.score += score;
        story.contributions.push({ text, userId });
        await story.save();

        res.status(200).send(story);
      } catch (error) {
        res.status(500).send({ message: "Server error" });
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
