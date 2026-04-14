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
//Retorna todos os dados do usuário independente do número
app.get('/v1/whatsapp/dados/user', function(request, response){
    let exibirDados = contatosWhatsApp.getListarDadosDosUsuarios()
    response.status(200)
    response.json(exibirDados)
})


app.listen(8080, function(){
    console.log("API funcionando e aguardando novas requisições...")
    })