const Sequelize = require('sequelize');
const config = new Sequelize("nodejsanddb", "root", "", {dialect: 'mariadb'});

module.exports = config;