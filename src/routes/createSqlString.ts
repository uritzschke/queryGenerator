import Query from "../schema/query";
import { In, Equal } from "../schema/filter";
import DateRestriction from "../schema/dateRestriction";

/**
 * This is a javascript/ typescript challenge: We cannot simply get the type of an interface with "instanceof".
 * Instead, we have to check for an identifying parameter in the interface to determine it's type.
 * see https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
 * @param object
 * @returns
 */
function instanceOfIn(object: any): object is In {
  return "values" in object;
}

function getCommaSeperatedValues(values: string[], addQutation: boolean) {
  let ret: string = "";
  values.forEach((value) => {
    if (ret != "") {
      ret += ", ";
    }
    if (addQutation) {
      ret += "'" + value + "'";
    } else {
      ret += value;
    }
  });

  return ret;
}

/**
 *
 * @param filters
 * @returns String: "column3 IN ('abc') AND column4 = '5'"
 */
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
        getCommaSeperatedValues(filter.values, true) +
        ")";
    } else {
      filterString += filter.column + " = '" + filter.value + "'";
    }
  });

  return filterString;
}

/**
 *
 * @param dateRestriction
 * @returns String: "YEAR(dateColumn) >= '2021' AND YEAR(dateColumn) <= '2022'"
 */
function buildDateFilterString(dateRestriction: DateRestriction) {
  let dateFilterString = "";
  if (dateRestriction.minDate != "") {
    dateFilterString +=
      "YEAR(" +
      dateRestriction.column +
      ")" +
      " >= '" +
      dateRestriction.minDate +
      "'";
  }

  if (dateRestriction.maxDate != "") {
    if (dateFilterString != "") {
      dateFilterString += " AND ";
    }
    dateFilterString +=
      "YEAR(" +
      dateRestriction.column +
      ")" +
      " <= '" +
      dateRestriction.maxDate +
      "'";
  }

  return dateFilterString;
}

/**
 *
 * @param query
 * @returns String: "SELECT column1, column2, column3, dateColumn from table1 WHERE column3 IN ('abc', 'def')"
 */
export function createSqlStringForQuery(query: Query) {
  let string =
    "SELECT " +
    getCommaSeperatedValues(query.select, false) +
    " from " +
    query.table;

  let filterString = buildFilterString(query.filters);

  if (filterString != "") {
    string += " WHERE " + filterString;
  }

  console.log("Query: " + string);
  return string;
}

/**
 *
 * @param dateRestriction
 * @returns String: "SELECT column1, column2, dateColumn from table1 WHERE column3 IN ('abc') AND column4 = '5' AND YEAR(dateColumn) >= '2021' AND YEAR(dateColumn) <= '2022'"
 */
export function createSqlStringForDateRestriction(
  dateRestriction: DateRestriction
) {
  let string =
    "SELECT " +
    getCommaSeperatedValues(dateRestriction.child.select, false) +
    " from " +
    dateRestriction.child.table;

  let filterString = buildFilterString(dateRestriction.child.filters);

  let dateFilterString = buildDateFilterString(dateRestriction);

  if (filterString != "") {
    string += " WHERE " + filterString;
  }

  if (dateFilterString != "") {
    if (filterString != "") {
      string += " AND ";
    } else {
      string += " WHERE ";
    }
    string += dateFilterString;
  }

  console.log("Query: " + string);
  return string;
}
