const Sequelize = require('Sequelize');

const connection = new Sequelize('forum','root','@teste@@@',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
