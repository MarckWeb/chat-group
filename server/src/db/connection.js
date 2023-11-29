//se nesecita instalar mysqlmp2
//npm install --save mysql2
import mysql from 'mysql2/promise';

import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js';

//https://www.youtube.com/watch?v=xqZdVpBYVy0
// const pool = mysql.createPool({
//    host: 'nuepp3ddzwtnggom.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', //seria el ip del atlasDB
//    user: 'ydxj3rl6fclr2pfl',
//    password: 'qoiy6839bbh7xl2b',
//    port: '3306',
//    database: 'cgqs9hy79lp5k9p9',
// });

const pool = mysql.createPool({
   host: DB_HOST, //seria el ip del atlasDB
   user: DB_USER,
   password: DB_PASSWORD,
   port: DB_PORT,
   database: DB_DATABASE,
});

pool.on('error', (err) => {
   console.error('Error en el pool de conexiones:', err);
});

export default pool;