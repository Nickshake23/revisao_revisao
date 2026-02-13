import mysql from "mysql2/promise";


export const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"root",
    database:"escola",
    port: 3306,
    //Define se o pool deve esperar quando não houver disponivel
    waitForConnections: true, 
    connectionLimit: 2,
    queueLimit: 0
})