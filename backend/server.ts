import express, { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { designEvRouter } from "./src/designEv/designEv.controller";
import dotenv from "dotenv";
import { authRouter } from './src/auth/auth.controller';

dotenv.config();

const app = express();

async function main() {
  app.use(express.json());

  const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    if (err instanceof SyntaxError && "body" in err) {
      console.error("Invalid JSON payload:", err.message);
      res.status(400).json({ message: "Invalid JSON payload" });
      return;
    }
    next(err); 
  };
  app.use(jsonErrorHandler);

  app.use('/api/auth', authRouter);  

  app.use("/api/events", designEvRouter);


  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send("Что-то пошло не так...");
  });

  const port = process.env.PORT || 4200;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();

