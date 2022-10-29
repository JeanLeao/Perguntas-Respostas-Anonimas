const Sequelize = require('sequelize');
const conect = require('./database.js');

const Resposta = conect.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{ //relacionamento simples
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;
