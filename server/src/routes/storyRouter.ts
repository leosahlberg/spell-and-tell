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
    "user/:id",
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
      const {title, created, userId, rouleSetId} = req.body;
      if(!rouleSetId){
        
      }
      const rouleSetData = rouleSetId ? await rouleSetModel.findOne({type: "default"}): rouleSetId;
      if(rouleSetData){
        const data = await storyModel.create({ title: title, status: "created", created: created, userId: userId, rouleSetId: rouleSetData._id });
      res.status(200).send(data);
      }
      
    } catch (error) {
      res.status(404).send({ message: "Error: Failed to create story." });
    }
  });

  router.put(
    "/:id",
    authenticateUser(),
    async (req: Request, res: Response) => {
      try {
        const {status} = req.body;
        const data = await storyModel.findByIdAndUpdate({
          _id: req.params.id,
          status: status,
        });
        res.status(200).send(data);
      } catch (error) {
        res.status(404).send({ message: "Error: Failed to update story." });
      }
    }
  );

  return router;
}
