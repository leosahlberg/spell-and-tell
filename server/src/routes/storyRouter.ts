import Express, { Request, Response, NextFunction } from "express";
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

  router.post("/", async (req, res) => {});

  return router;
}
