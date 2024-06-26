import { Equal, In } from "./filter";

export default interface Query {
  type: string;
  table: string;
  filters: (Equal | In)[];
  select: string[];
}
