import runSQLStatement from "../database/db";
import Query from "../schema/query";
import { In, Equal } from "../schema/filter";

export default async function queryDatabase(query: Query) {
  let queryString: string = buildQueryString(query);

  let resultPromise: Promise<string> = runSQLStatement(queryString);
  return resultPromise;
}

// This is a javascript/ typescript challenge: We can't simply get the type of an interface with "instanceof".
// Instead, we have to check for an identifying parameter in the interface to determine it's type.
// see https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
function instanceOfIn(object: any): object is In {
  return "values" in object;
}

function getCommaSeperatedValues(values: string[]) {
  let ret: string = "";
  values.forEach((value) => {
    if (ret != "") {
      ret += ", ";
    }
    ret += "'" + value + "'";
  });

  return ret;
}

function buildFilterString(filters: (In | Equal)[]) {
  let filterString: string = "";
  filters.forEach((filter) => {
    if (filterString != "") {
      filterString += " AND ";
    }
    if (instanceOfIn(filter)) {
      filterString +=
        filter.column +
        " " +
        filter.type +
        " (" +
        getCommaSeperatedValues(filter.values) +
        ")";
    } else {
      filterString += filter.column + " = '" + filter.value + "'";
    }
  });

  return filterString;
}

function buildQueryString(query: Query) {
  let string =
    "SELECT " + getCommaSeperatedValues(query.select) + " from " + query.table;

  let filterString = buildFilterString(query.filters);

  if (filterString != "") {
    string += " WHERE " + filterString;
  }

  console.log("Query: " + string);
  return string;
}
