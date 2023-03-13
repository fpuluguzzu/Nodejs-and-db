const Sequelize = require('sequelize');
const config = require('./../config');

const Student = config.define('student', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    section: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    gpa: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nationality: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Student;