import express, { Express, Request, Response } from "express";
import queryGeneratorRoutes from "./routes/queryGeneratorRoute";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});
app.use("/queryGenerator", queryGeneratorRoutes);

export default app;
