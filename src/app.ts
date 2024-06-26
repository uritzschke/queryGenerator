import express, { Express } from "express";
import queryGeneratorRoutes from "./routes/queryGeneratorRoute";
import { createDbConnectionPool } from "./database/db";

const app: Express = express();

app.use(express.json());

createDbConnectionPool();

app.use("/queryGenerator", queryGeneratorRoutes);

export default app;
