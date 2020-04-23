// Express
const express = require("express");
const app = express();
// body-parser
const bodyParser = require("body-parser");
// conexão 
const connection = require("./database/database");
const Perguntas = require("./database/Perguntanode");
const Resposta = require("./database/Respostanode");

//CONEXÃO NO AR

connection 
    .authenticate()
    .then(()=>{
        console.log("CONEXÃO RODANDO");
    }).catch(()=>{
        console.log("NÃO TEM CONEXAO COM O BANCO DE DADOS");
    })

// Configuracação do body-parser e Ejs
//ejs
app.set('view engine','ejs');
app.use(express.static('public'));
//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Post rotas

app.post("/perguntas", (req,res)=>{
    var titulo = req.body.titulo;
    var descricao =req.body.descricao;

    Perguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
    res.redirect("/");
});
});

// POST resposta

app.post("/responder", (req,res)=>{
    var corpo = req.body.corpo;
    var respostaId  = req.body.resposta
    Resposta.create({
        corpo:corpo,
        respostaId:respostaId
    }).then(()=>{
        res.redirect("/pergunta/"+respostaId);
    });
});



//Rotas 
app.get("/",(req,res)=>{
    Perguntas.findAll({ raw: true, order:[
        ['id','DESC'] // ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
})
// Rota de escolha 
app.get("/duvidas",(req,res)=>{
    res.render("duvidas/duvidas");
});
// Rotas de perguntas 

//node
app.get("/perguntarnode",(req, res)=>{
    res.render("perguntar/perguntarnode");
});
//
app.get("/perguntarphp",(req, res)=>{
    res.render("perguntar/perguntarphp");
});

app.get("/perguntarpython",(req, res)=>{
    res.render("perguntar/perguntarpython");
});

// Rotas de respostas

app.get("/resposta/resposta",(req,res)=> { 
    res.render("resposta/resposta");
});

//rotas id pergunta 


app.get("/pergunta/:id" , (req,res)=> {
    var id = req.params.id;
    Perguntas.findOne({
        
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where:{ respostaId: pergunta.id},
                order: [['id','DESC']]
                
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta:pergunta,// passando pergunta para pode levar o dados como descircao e resposta
                    respostas:respostas // passando respostas que pesquisei para respostas
                });
            }); 
        }else{
            res.redirect("/");
        } // se a respsta é diferente de nulo ela e valida
})
})




// listando a porta.
app.listen(3333);