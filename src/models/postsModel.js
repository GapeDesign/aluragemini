import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Esta linha estabelece a conexão com o banco de dados MongoDB, 
// utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts de uma coleção específica no banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados 'imersao-instabytes' da conexão.
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma operação de busca em toda a coleção e retorna todos os documentos como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);

}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});

}