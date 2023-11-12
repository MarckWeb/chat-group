//se nesecita instalar mysqlmp2
//npm install --save mysql2
import mysql from 'mysql2/promise';

import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js';


const pool = mysql.createPool({
   host: DB_HOST, //seria el ip del atlasDB
   user: DB_USER,
   password: DB_PASSWORD,
   port: DB_PORT,
   database: DB_DATABASE,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});



pool.on('error', (err) => {
   console.error('Error en el pool de conexiones:', err);
});

export default pool;