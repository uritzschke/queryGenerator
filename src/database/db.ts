import mariaDb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

let pool: mariaDb.Pool;

export function createDbConnectionPool() {
  pool = mariaDb.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "", 10),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectionLimit: 5,
    trace: true,
  });
  console.log("[server]: Database connection pool created");
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
