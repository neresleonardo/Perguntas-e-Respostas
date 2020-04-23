const Sequelize = require("sequelize");
const connection = require("./database");

const Perguntas = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allonNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allonNull: false
    }
});

Perguntas.sync({force:false}).then(()=>{
    console.log("Banco de dados Perguntarnode criado");
});

module.exports = Perguntas;