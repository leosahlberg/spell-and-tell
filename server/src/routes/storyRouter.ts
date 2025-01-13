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

  router.post("/", authenticateUser(), async (req: Request, res: Response) => {
    try {
      const data = await storyModel.create({ ...req.body });
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
        const data = await storyModel.findByIdAndUpdate({
          _id: "",
          ...req.body,
        });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "Error: Failed to create story." });
      }
    }
  );

  return router;
}
