import { Router, Request, Response, NextFunction } from "express";
import querySchema from "../schema/querySchema";
import Query from "../schema/query";
import queryDatabase from "./queryDatabase";
import runSQLStatement from "../database/db";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  let query: Query;

  if (querySchema(req.body)) {
    query = req.body;
  } else {
    const errors = querySchema.errors;
    console.log("Errors: " + errors);
    res.status(400).json(errors);
    res.send();
    return;
  }

  try {
    //let dbResult = await runSQLStatement("SELECT * from table1");
    let dbResult = await queryDatabase(query);
    res.status(200);
    res.send(dbResult);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

export default router;
