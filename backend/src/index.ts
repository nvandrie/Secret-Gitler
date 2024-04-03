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
import WebSocket from "ws";
import http from 'http';

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

const whitelist = ['http://localhost:5173'];
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use(errorHandler);
app.use(lobbyRouter);
app.use(gameRouter);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    console.log(`Received message: ${message}`);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const broadcastMessage = (message: any) => {
  const jsonMessage = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonMessage);
    }
  });
};

export { broadcastMessage };

connectUserDB();

