const Sequelize = require('sequelize');
const conect = require('./database.js');

const Quest = conect.define('pergunta',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Quest.sync({force: false}).then(() => {
    console.log('Tabela Criada Automaticamente.')
})

module.exports = Quest;