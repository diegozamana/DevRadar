const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// Faz a conexão com o banco do MongoDB - Dados retirados para publicação no GitHub
mongoose.connect();

// Avisa o Express que iremos usar requisições que tem o corpo no formato JSON
app.use(express.json()); 

// O JSON tem que vir antes das rotas para que o app interprete corretamente
app.use(routes);

// Métodos HTTP
// GET    - Pegar, buscar info
// POST   - Criar, salvar info
// PUT    - Editar info
// DELETE - Deletar info

// Tipos de parâmetros:
// Query Params - req.query (Filtros, ordenação, paginação,...)
// Route Params - req.params (Identificar um recurso na alteração ou remoção)
// Body         - req.body (Dados para criação ou alteração de um registro)

// MongoDB (Banco Não-relacional)
// https://mongodb.com/cloud/atlas


server.listen(3333);