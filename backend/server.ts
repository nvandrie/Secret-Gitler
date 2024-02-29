// backend/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

