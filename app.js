/********************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Whatsapp
 * Data: 14.04.26
 * Nome: Riller
 * Versão: 1.0
 ********************************************************************************************/

//Import das dependências para criar a API
const express = require('express')
const cors    = require('cors')

//Criar um objeto para manipular o express
const app = express()

//Permissões a serem aplicadas no CORS da API
const corsOptions = {
    //Origem da requisição
    origin:         ['*'],
    //Tipo de método
    methods:        'GET',
    //Permissões de cabeçalho
    allowedHeaders: ['Content-type', 'Autorization']
}

//Configura as permissões da API através do cors
app.use(cors(corsOptions))

const contatosWhatsApp = require('./modulo/functions.js')

//EndPoints
//Retorna todos os dados da conta do profile do usuário
app.get('/v1/whatsapp/dados/user', function(request, response){
    let numero = request.query.number
    let exibirDados = contatosWhatsApp.getListarDadosDaConta(numero)
    if(exibirDados){
        response.status(200)
        response.json(exibirDados)
    }else{
        response.status(404)
        response.json({"Message": "Não foi possível encontrar um contato com esse número"})
    }
})

//Retornar dados pessoais de cada contato do usuário
app.get('/v1/whatsapp/dados/contacts/user', function(request, response){
    let numero = request.query.number
    let exibirDados = contatosWhatsApp.getListarDadosDoContato(numero)
    if(exibirDados){
        response.status(200)
        response.json(exibirDados)
    }else{
        response.status(404)
        response.json({"Message": "Não foi possível encontrar um contato com esse número"})
    }
})

//Retornar todas as mensagens trocadas de uma conta do usuário
app.get('/v1/whatsapp/dados/messages/contacts/user', function(request, response){
    let numero = request.query.number
    let exibirDados = contatosWhatsApp.getListarMensagens(numero)
    if(exibirDados){
        response.status(200)
        response.json(exibirDados)
    }else{
        response.status(404)
        response.json({"Message": "Não foi possível encontrar um contato com esse número"})
    }
})

//Retornar uma conversa do usuário com um contato, tendo como critério de filtro o número e o nome do contato
app.get('/v1/whatsapp/dados/messages/contact/user', function(request, response){
    let numero = request.query.number
    let nome   = request.query.name
    let exibirDados = contatosWhatsApp.getListarConversasDeUmContato(numero, nome)
    if(exibirDados){
        response.status(200)
        response.json(exibirDados)
    }else{
        response.status(404)
        response.json({"Message": "Não foi possível encontrar um usuário com esse número ou um contato com esse nome"})
    }
})

//Retorna as mensagens filtradas tendo como critério de filtro o número e a palavra chave
app.get('/v1/whatsapp/dados/filterMessages/user', function(request, response){
    let palavra = request.query.word
    let numero  = request.query.number
    let exibirDados = contatosWhatsApp.getPalavraChave(numero, palavra)

    if(exibirDados){
        response.status(200)
        response.json(exibirDados)
    }else{
        response.status(404)
        response.json({"Message": "Não foi possível encontrar um contato com esse número ou uma palavra com esses caracteres"})
    }
})

//Retorna todos os dados do usuário independente do número
app.get('/v1/whatsapp/dados/allUsers', function(request, response){
    let exibirDados = contatosWhatsApp.getListarDadosDosUsuarios()
    response.status(200)
    response.json(exibirDados)
})

//Retorna o caminho para os EndPoints
app.get('/v1/whatsapp/help', function(request, response){
    let docAPI = {
        "API-description": "API para manipular dados de usuários e contatos",
        "Date": "2026-04-13",
        "Development": "Rillao the best",
        "Version": "1.0",
        "EndPoints": [
            {
                "id": 1, 
                "Rota 1": "/v1/whatsapp/dados/allUsers", 
                "obs": "Retorna todos os dados do usuário independente do número"
            }, 
            {
                "id": 2, 
                "Rota 2": "/v1/whatsapp/dados/user/?number=11987876567", 
                "obs": "Retorna os dados da conta do profile do usuário"
            },
            {
                "id": 3, 
                "Rota 3": "/v1/whatsapp/dados/contacts/user/?number=11987876567", 
                "obs": "Retorna dados pessoais de cada contato do usuário"
            },
            {
                "id": 4, 
                "Rota 4": "/v1/whatsapp/dados/messages/contacts/user/?number=11987876567", 
                "obs": "Retorna todas as mensagens trocadas de uma conta do usuário"
            },
            {
                "id": 5, 
                "Rota 5": "/v1/whatsapp/dados/messages/contact/user/?number=11987876567&name=ana maria", 
                "obs": "Retorna uma conversa do usuário com um contato"
            },
            {
                "id": 6, 
                "Rota 6": "/v1/whatsapp/dados/filterMessages/user/?number=11987876567&word=hi", 
                "obs": "Retorna as mensagens filtradas da conta do profile do usuário"
            },                       
        ]
    }

    response.status(200)
    response.json(docAPI)
})

app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições...")
    })