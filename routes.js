const express = require('express');
const Pergunta = require('./models/Pergunta');
const Resposta = require('./models/Resposta');

const route = express();

//Rotas para pergunta
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

route.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({ 
        where:{id:id}
    }).then(pergunta => {
        if(pergunta != undefined){
            
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order:[
                    ['id', 'DESC']
                ]}).then(respostas => {
                res.render("pergunta", { 
                    pergunta: pergunta,
                    respostas: respostas });
            });           
        }else{ //Não encontrada
            res.redirect("/");
        }
    });
});

route.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/");
    });
});

//Rotas para Resposta
route.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaId}`);
    });
});

module.exports = route;