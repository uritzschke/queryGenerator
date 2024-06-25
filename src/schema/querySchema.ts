import { JSONSchemaType } from "ajv";
import ajvInstance from "./ajvInstance";
import Query from "./query";
import { Equal, In } from "./filter";

const equalSchema: JSONSchemaType<Equal> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/equalSchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    value: { type: "string" },
    column: { type: "string" },
  },
  required: ["type", "value", "column"],
};

const inSchema: JSONSchemaType<In> = {
  $id: "http://andersanders.de/schemas/QueryGenerator/0.1/inSchema.json",
  type: "object",
  properties: {
    type: { type: "string" },
    values: {
      type: "array",
      items: {
        type: "string",
      },
    },
    column: { type: "string" },
  },
  required: ["type", "values", "column"],
};

const schema: JSONSchemaType<Query> = {
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

export default ajvInstance
  .addSchema(equalSchema)
  .addSchema(inSchema)
  .compile(schema);
