import Express, { Request, Response } from "express";
import { authenticateUser } from "../auth/authenticate";
import { invitationModel } from "../database/models/invitationModel";

export function invitationRouter() {
  const router = Express.Router();

  router.get(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await invitationModel.find({ userId: req.params.id });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No stories found." });
      }
    }
  );

  router.post("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await invitationModel.create({ ...req.body });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ message: "Error: Failed to create story." });
    }
  });

  router.put(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const { status } = req.body;
        const data = await invitationModel.findByIdAndUpdate(
          req.params.id,
          { $set: { status: status } },
          { new: true }
        );
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "Error: Failed to create story." });
      }
    }
  );

  return router;
}
