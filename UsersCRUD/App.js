const express = require('express');
const mongoose = require('mongoose');
const routeUsers = require('./routes/users-route.js');
const App = express();
const port = 3000;

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// Middleware
const trataLog = (req, res, next) => {
    console.log("Método: ", req.method);
    console.log("URI: ", req.originalUrl);
    console.log("Status: ", res.statusCode);
    next();
};

App.use(trataLog);

mongoose.connect('mongodb://127.0.0.1:27017/app_users')
.then(() => {
    console.log("MongoDB conectado");
}).catch((err) => {
    console.log("MongoDB error: ", err);
});

App.use('/api/users', routeUsers);

App.listen(port, () => {
    console.log(`Servidor ativo na porta: ${port}`);
});