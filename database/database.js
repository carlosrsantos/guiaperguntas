const Sequelize = require('sequelize');

//Conexão com o banco de Dados MariaDB
const connection = new Sequelize('guiaperguntas','root','root',{
        host: 'localhost',
        dialect: 'mariadb'
});

module.exports = connection;