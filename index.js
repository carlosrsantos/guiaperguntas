const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const route = require('./routes');

//Database
const connection = require('./database/database');
connection
    .authenticate()
    .then(() => {
        
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    });

//Usando EJS como view engine para html
app.set('view engine','ejs');
app.use(express.static('public'));

//Usando body-parser para converter dados de requisição de formulário para JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //leia dados de formulário enviados via JSON

//Rotas
app.use('/', route);

//porta do Servidor
app.listen(3333);