import { resourceLimits } from "worker_threads";
import runSQLStatement from "../database/db";
import Query from "../schema/query";
import { resolveUrl } from "ajv/dist/compile/resolve";

export default async function queryDatabase(query: Query) {
  let resultPromise: Promise<string> = runSQLStatement("SELECT * from table1");
  return resultPromise;
}
