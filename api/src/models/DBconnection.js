const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD, {
    host: config.DB_HOST,
    port: 3308,
    dialect: config.DB_DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging:false
});

module.exports = sequelize;
