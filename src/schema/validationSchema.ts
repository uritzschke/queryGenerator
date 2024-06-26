import { JSONSchemaType } from "ajv";
import Query from "../model/query";
import { Equal, In } from "../model/filter";
import DateRestriction from "../model/dateRestriction";

import Ajv from "ajv";

const ajvInstance = new Ajv({ allErrors: true });
const ajvInstance2 = new Ajv({ allErrors: true });

const equalSchema: JSONSchemaType<Equal> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/equalSchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    value: { type: "string" },
    column: { type: "string" },
  },
  required: ["type", "value", "column"],
  additionalProperties: false,
};

const inSchema: JSONSchemaType<In> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/inSchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    values: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
      },
    },
    column: { type: "string" },
  },
  required: ["type", "values", "column"],
  additionalProperties: false,
};

const querySchema: JSONSchemaType<Query> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/querySchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    table: { type: "string" },
    filters: { type: "array", items: { oneOf: [inSchema, equalSchema] } },
    select: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["type", "table"],
  additionalProperties: false,
};

const dateRestrictionSchema: JSONSchemaType<DateRestriction> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/dateRestrictionSchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    minDate: { type: "string" },
    maxDate: { type: "string" },
    column: { type: "string" },
    child: querySchema,
  },
  required: ["type", "column", "child"],
  additionalProperties: false,
};

export let queryValidator = ajvInstance
  .addSchema(equalSchema)
  .addSchema(inSchema)
  .compile(querySchema);

export let dateRestrictionValidator = ajvInstance2
  .addSchema(equalSchema)
  .addSchema(inSchema)
  .addSchema(querySchema)
  .compile(dateRestrictionSchema);
