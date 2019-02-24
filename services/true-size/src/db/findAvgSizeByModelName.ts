import { QueryInterface } from "knex";
import { TABLE_TRUE_SIZES } from "./tables";
import Bluebird from "bluebird";

export function findAvgSizeByModelName(
  qb: QueryInterface,
  name: string
): Bluebird<number> {
  return qb
    .avg({ avg: TABLE_TRUE_SIZES.COLUMN_VALUE })
    .from(TABLE_TRUE_SIZES.NAME)
    .where(TABLE_TRUE_SIZES.COLUMN_NAME, name)
    .first()
    .then(({ avg }: { avg: number }) => avg);
}
