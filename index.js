const express = require('express');
const app = express();
const port = 8001;

const rotaProdutos = require('./routes/routeProduto');

app.use('/rotas', rotaProdutos);

app.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
})

module.exports = app;