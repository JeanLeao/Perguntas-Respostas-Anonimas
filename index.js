const express = require('express');
const app = express();

// criando tables 
const pergunta = require('./database/Quest.js')
const resposta = require('./database/Resposta.js')

//conectando banco
const connec = require('./database/database.js');

connec.authenticate().then(() =>{
    console.log('Conectado ao Banco!')
}).catch((err) => {
    console.log('Erro:' + err)
})

//USANDO O EJS COMO VIEW ENGINE PARA O EXPRESS
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}))
app.use(express.json());


app.get('/', (req,res) => {
    pergunta.findAll({raw: true}).then((pergunta) => {
        console.log(pergunta)
        pergunta.reverse();
        res.render('index.ejs',{
            quest: pergunta 
        });})
    })

app.get('/perguntar',(req,res) =>{
    res.render('perguntar.ejs');
})

app.post('/savequest',(req,res)=>{
    var titulo = req.body.title
    var quest = req.body.pergunta
    pergunta.create({
        title: titulo,
        description: quest
    }).then(()=>{
       res.redirect('/perguntar');
    });
});

app.get('/pergunta/:id', (req,res) =>{
    var id = req.params.id;
    pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if (pergunta != undefined){  // Pergunta encontrada

            resposta.findAll({where: {perguntaId: pergunta.id}}).then((respostas) =>{
                res.render('pergunta.ejs', {
                    id: pergunta,
                    res: respostas
                   });
            })

        }else{
            res.redirect('/')
        }
    })
});


app.post('/resposta', (req,res) =>{
    var corpo = req.body.corpo;
    var ID = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: ID
    }).then(()=>{
        res.redirect('/pergunta/'+ID);
     });
});




app.listen(8080, () =>{console.log('Funcionando.');})