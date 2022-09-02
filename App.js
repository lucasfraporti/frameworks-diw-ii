const express = require('express');
const routeProduto = require('./routes/produto-routes');
const App = express();
const port = 3000;

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use('/api/produtos', routeProduto);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});