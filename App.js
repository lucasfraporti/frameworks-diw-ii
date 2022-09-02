const express = require('express');
const mongoose = require('mongoose');
const routeProduto = require('./routes/produto-routes');
const App = express();
const port = 3000;

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// Configuração da conexão com o Mongo
mongoose.connect('mongodb://127.0.0.1:27017/app_produtos')
.then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.log(error);
});

App.use('/api/produtos', routeProduto);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});