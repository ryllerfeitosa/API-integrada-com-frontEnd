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

//Retorna todas as mensagens de conversa de um usuário
const getListarDeMensagens = function(numero){
    let exibirDados     = false
    //Cria um objeto com todos os dados
    dados.contatos['whats-users'].forEach(function(item){
        if(Number(item.number) == Number(numero)){
            exibirDados = []
            //Cria um objeto a partir do atributo contato
            item.contacts.forEach(function(itemContato){
                //Array para armazenar as mensagens de um contato
                let dadosDeMensagem = []
                //Percorre as mensagens pertencentes a um contato
                itemContato.messages.forEach(function(itemMensagem){
                //Cria um objeto com todas as mensagens pertencentes a um contato
                dadosDeMensagem.push(itemMensagem)
                })
                //Cria um objeto com todos os atributos de um contato
                let mensagemFinal = {
                    "Name": itemContato.name,
                    "Description": itemContato.description,
                    "image": itemContato.image,
                    "Messages": dadosDeMensagem
                }
                exibirDados.push(mensagemFinal)
            })
        }
    })
    return exibirDados
}

//Retorna todas as mensagens de um contato do usuario
const getListarConversasDeUmContato = function(numero, nome){
    let exibirDados = false
    let mensagens   = []
    dados.contatos['whats-users'].forEach(function(item){
        if(Number(item.number) == Number(numero)){
            item.contacts.forEach(function(contato){
                if(String(nome).toUpperCase() == String(contato.name).toUpperCase()){
                    mensagens.push(contato.messages)
                    exibirDados = {
                        "Name": item.account,
                        "Profile_image": item['profile-image'],
                        "Number": item.number,
                        "Contact": contato.name,
                        "Description": contato.description,
                        "Profile_contact": contato.image,
                        "Messages": contato.messages
                    }
                }
            })
        }
    })
    return exibirDados
}

//Retorna uma mensagem tendo como critério de filtro a palavra e o número
const getPalavraChave = function(numero, palavra){
    let exibirDados = false
    dados.contatos['whats-users'].forEach(function(item){
        if(Number(numero) == Number(item.number)){
            exibirDados = []
            item.contacts.forEach(function(contato){
                let mensagensFiltradas = []
                contato.messages.forEach(function(mensagem){
                    // \b: Garante que o "hi" não tenha letras coladas nele (evita o "thinking").
                    // 'i': Faz o papel do toUpperCase(), ignorando se é maiúsculo ou minúsculo.
                    const regex = new RegExp(`\\b${palavra}\\b`, 'i')
                    if(regex.test(mensagem.content)){
                        mensagensFiltradas.push({
                            "Sender": mensagem.sender,
                            "Content": mensagem.content,
                            "Time": mensagem.time
                        })
                    }
                })
                if(mensagensFiltradas.length > 0){
                        exibirDados.push({
                        "Contact": contato.name,
                        "Description": contato.description,
                        "Profile_contact": contato.image,
                        "Filter_messages": mensagensFiltradas
                    })
                }
            })
        }
    })

    return exibirDados
}