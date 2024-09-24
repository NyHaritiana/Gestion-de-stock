import pkg from 'pg';

const { Client } = pkg;

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "myrhl",
    database: "g_stockDB"
});

con.connect()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Connection error", err.stack));
