import mariaDb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariaDb.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "", 10),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  connectionLimit: 5,
  trace: true,
});

async function asyncFunction() {
  console.log("asyncFunction");
  let conn: mariaDb.PoolConnection | undefined;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * from table1");
    console.log(rows); //[ {val: 1}, meta: ... ]
    /* const res = await conn.query("INSERT INTO myTable value (?, ?)", [
            1,
            "mariadb",
            ]);
            console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
            */
  } catch (err) {
    console.log("catch-Block");
    throw err;
  } finally {
    console.log("finally-Block");
    if (conn) return conn.end();
  }
}

export default async function runSQLStatement(statement: string) {
  let conn: mariaDb.PoolConnection | undefined;
  try {
    conn = await pool.getConnection();
    let result = await conn.query(statement);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}
