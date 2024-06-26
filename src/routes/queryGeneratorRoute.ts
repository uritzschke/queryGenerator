import { Router, Request, Response, NextFunction } from "express";
import validateInput from "../schema/inputValidator";
import {
  createSqlStringForDateRestriction,
  createSqlStringForQuery,
} from "./createSqlString";
import runSQLStatement from "../database/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  let { dateRestriction, query, errors } = validateInput(req);

  if (errors) {
    console.error("Errors while validating input: " + errors);
    res.status(400).json(errors);
    res.send();
    return;
  }

  try {
    let dbResult: Promise<string>;
    if (query) {
      let queryString = createSqlStringForQuery(query);
      dbResult = await runSQLStatement(queryString);
    } else if (dateRestriction) {
      let queryString = createSqlStringForDateRestriction(dateRestriction);
      dbResult = await runSQLStatement(queryString);
    } else {
      res.status(500);
      return;
    }
    res.status(200);
    res.send(dbResult);
  } catch (error) {
    res.status(400);
    console.error(error);
    res.send(error);
  }
});

export default router;
