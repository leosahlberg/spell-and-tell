import Express, { Request, Response } from "express";
import { authenticateUser } from "../auth/authenticate";
import { invitationModel } from "../database/models/invitationModel";
import { storyModel } from "../database/models/storyModel";
import { userModel } from "../database/models/userModel";

export function invitationRouter() {
  const router = Express.Router();

  router.get("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await invitationModel
        .find({})
        .populate({ path: "userId", select: "name" })
        .populate("storyId");
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
        const data = await invitationModel
          .find({ userId: req.params.id })
          .populate({ path: "userId", select: "name" })
          .populate("storyId");
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No stories found." });
      }
    }
  );

  router.post(
    "/",
    authenticateUser(),
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { storyId, userId } = req.body;

        const [story, user] = await Promise.all([
          storyModel.findById(storyId),
          userModel.findById(userId),
        ]);

        if (!story) {
          res.status(404).send({
            message: "Error: Failed to send invitation. Story not found.",
          });
          return;
        }

        if (!user) {
          res.status(404).send({
            message: "Error: Failed to send invitation. User not found.",
          });
          return;
        }

        const data = await invitationModel.create({
          storyId,
          userId,
          status: "pending",
        });

        res.status(200).send(data);
      } catch (error) {
        res.status(500).send({
          message: "Error: Failed to send invitation. Server error.",
        });
      }
    }
  );

  router.put(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await invitationModel.findByIdAndUpdate(
          req.params.id,
          { $set: { status: req.body } },
          { new: true }
        );
        res.status(200).send(data);
      } catch (error) {
        res
          .status(404)
          .send({ message: "Error: Failed to accept invitation." });
      }
    }
  );

  return router;
}
