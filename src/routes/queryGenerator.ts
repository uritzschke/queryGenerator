import { Router, Request, Response } from "express";
const router = Router();
import querySchema from "../schema/querySchema";
import Query from "../schema/query";

export default router;

router.post("/", (req: Request, res: Response) => {
  if (querySchema(req.body)) {
    let query: Query = req.body;

    console.log("req.query.select: " + query.select);
    console.log("req.query.table: " + query.table);
    console.log("req.query.type: " + query.type);
    console.log("req.query.filters: " + query.filters);

    res.status(200);
    res.send();
  } else {
    const errors = querySchema.errors;
    console.log("Errors: " + errors);
    res.status(400).json(errors);
    res.send();
  }
});
