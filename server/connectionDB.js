const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("g_stockDB", "postgres", "myrhl", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
});

module.exports = sequelize;