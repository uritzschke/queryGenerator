import Ajv from "ajv";

const ajvInstance = new Ajv({ allErrors: true });

export default ajvInstance;
