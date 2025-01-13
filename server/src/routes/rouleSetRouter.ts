import Express, { Request, Response } from "express";
import { authenticateUser } from "../auth/authenticate";
import { rouleSetModel } from "../database/models/roulesetModel";

export function rouleSetRouter() {
  const router = Express.Router();

  router.get(
    "/_id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const data = await rouleSetModel.find({ storyId: req.params.id });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "No stories found." });
      }
    }
  );

  router.post("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await rouleSetModel.create({ ...req.body });
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ message: "Error: Failed to create story." });
    }
  });

  return router;
}
