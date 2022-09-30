const express = require('express');
const mongoose = require('mongoose');
const routeProduto = require('./routes/produto-routes');
const routeUser = require('./routes/user-routes');
const routeLogin = require('./routes/login-route');
const middleware = require('./middleware/login-middleware');

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

App.use(middleware.trataLog);
App.use('/api/login', routeLogin);
// Este middleware só poderá ser executado após o login e será executado em todas rotas, tanto na de produto quanto na de usuário
App.use(middleware.validaToken);
App.use('/api/produtos', routeProduto);
App.use('/api/users', routeUser);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});