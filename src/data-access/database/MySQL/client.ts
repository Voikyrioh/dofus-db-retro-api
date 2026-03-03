import * as mysql from 'mysql2/promise'
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from "../../../config/environment.js";

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.query('SELECT 1+1 FROM DUAL').catch(() => {
    throw new Error('Cannot connect to database: ');
});

export const mySql = Object.freeze(pool);
