import Query from "./query";

export default interface DateRestriction {
  type: string;
  minDate: string;
  maxDate: string;
  column: string;
  child: Query;
}
