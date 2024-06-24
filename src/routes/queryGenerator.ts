import { Router, Request, Response } from "express";
const router = Router();
import userSchema from "../schema/userSchema";

export default router;

router.post("/", (req: Request, res: Response) => {
  if (userSchema(req.body)) {
    console.log("req.body: " + req.body);
    res.status(200);
    res.send();
  } else {
    const errors = userSchema.errors;
    console.log(errors);
    res.status(400).json(errors);
    res.send();
  }
});
