import ajvInstance from "./ajvInstance";

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo", "bar"],
  additionalProperties: false,
};
export default ajvInstance.compile(schema);
