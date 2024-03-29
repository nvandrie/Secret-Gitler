import express, { Request, Response } from "express";
import authRouter from "./routes/authRouter";
import lobbyRouter from "./routes/lobbyRouter";
import connectUserDB from "./connections/userDB";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter";
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import gameRouter from "./routes/gameRouter"

interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = 3000;
app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use(errorHandler);
app.use(lobbyRouter);
app.use(gameRouter);


connectUserDB();

