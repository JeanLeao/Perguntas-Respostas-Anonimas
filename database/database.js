const Sequelize = require('Sequelize');

const connection = new Sequelize('forum','root','334499mil',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
