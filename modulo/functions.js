/********************************************************************************************
 * Objetivo: Arquivo responsável pelas funções que serão utilizadas na API Whatsapp
 * Data: 08.04.26
 * Nome: Riller
 * Versão: 1.0
 ********************************************************************************************/

//Importação do arquivo contatos.js
const dados = require('./contatos')

//Retorna todos os dados de todos os usuários
const getListarDadosDosUsuarios = function(){
    const dadosDoUsuario = dados.contatos['whats-users']
    return {
        "Usuarios": dadosDoUsuario
    }
}
//Retorna os dados da conta de cada usuário tendo como critério de filtro o número
const getListarDadosDaConta = function(numero){
    let status = false
    let dadosDaConta = []
    dados.contatos['whats-users'].forEach(function(item){
        if(Number(numero) == Number(item.number)){
            status = true
            dadosDaConta.push({
                "Name": item.account,
                "NickName": item.nickname,
                "Photo" : item['profile-image'],
                "Number": item.number,
                "BackGroundColor": item.background,
                "Created": item['created-since']
            })
        }
    })

    if(status)
        return dadosDaConta
    else
        return false
}
//Retorna dados de contato para cada usuário tendo como critério de filtro o número
const getListarDadosDoContato = function(numero){
    let dadosDosContato = false
    dados.contatos['whats-users'].forEach(function(item){
        if(Number(numero) == Number(item.number)){
            dadosDosContato = []
            dadosDosContato.push(item.contacts.map(function(itemContato){
                const contatos = {
                    "Name" : itemContato.name,
                    "Photo": itemContato.image,
                    "Description": itemContato.description,
                }
                return contatos
            }))
        }
    })
    return dadosDosContato
}

console.log(getListarDadosDoContato(11987876567))