const Sequelize = require('sequelize');

const connection = new Sequelize('heureka','root','senha',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;