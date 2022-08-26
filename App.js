const express = require('express');
const App = express();
const port = 8001;

const rotaProdutos = require('./routes/routeProduto');

App.use('/rotas', rotaProdutos);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});