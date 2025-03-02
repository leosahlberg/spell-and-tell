import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { connectToDb } from "./database/connectToDb";
import { userModel } from "./database/models/userModel";
import { generateToken } from "./auth/authenticate";
import { matchEncryptPassword } from "./auth/encryptPassword";
import { userRouter } from "./routes/userRouter";
import { contributionRouter } from "./routes/contributionRoute";
import { storyRouter } from "./routes/storyRouter";
import { rouleSetRouter } from "./routes/rouleSetRouter";
import { invitationRouter } from "./routes/invitationRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("*", async (req, res, next) => {
  try {
    await connectToDb();
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error: connection to database failed." });
    res.end();
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });

    if (user && (await matchEncryptPassword(password, user.password))) {
      const token = generateToken(user);
      res.status(200);
      res.send({
        token: token,
        user: {
          userId: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).send({ message: "Error: Invalid username or password." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error: Server failed to respond." });
    res.end();
  }
});

app.use("/user", userRouter());
app.use("/contribution", contributionRouter());
app.use("/story", storyRouter());
app.use("/rouleSet", rouleSetRouter());
app.use("/invitation", invitationRouter());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
