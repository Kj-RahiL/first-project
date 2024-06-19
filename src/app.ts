import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandeler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 'rahil';
  res.send(a);
};

app.get('/', test);

// global Error Handeler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
