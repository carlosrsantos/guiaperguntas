const express = require('express');
const Pergunta = require('./models/Pergunta');

const route = express();


route.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['createdAt','DESC']
    ] }).then(perguntas => {
        res.render('index',{
            perguntas:perguntas
        });
    });
    
});

route.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

route.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo,
        descricao
    }).then(()=>{
        res.redirect("/");
    })
});

module.exports = route;