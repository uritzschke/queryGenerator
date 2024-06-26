import { Request } from "express";
import {
  queryValidator,
  dateRestrictionValidator,
} from "../schema/validationSchema";
import Query from "../schema/query";
import DateRestriction from "../schema/dateRestriction";

export default function validateInput(req: Request) {
  let dateRestriction: DateRestriction | undefined;
  let query: Query | undefined;
  let errors;

  switch (req.body.type) {
    case "DATE_RESTRICTION":
      if (dateRestrictionValidator(req.body)) {
        dateRestriction = req.body;
      } else {
        errors = dateRestrictionValidator.errors;
      }
      break;

    case "QUERY":
      if (queryValidator(req.body)) {
        query = req.body;
      } else {
        errors = queryValidator.errors;
      }
      break;

    default:
      errors = "Validation error";
      break;
  }

  return { dateRestriction, query, errors };
}
