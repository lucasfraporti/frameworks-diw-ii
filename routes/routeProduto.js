const express = require('express');
const router = express.Router();

// Mostrando todos os produtos
router.get('/produtos', function (req, res){
    return res.status(200).send('Listando os produtos!');
});

// Mostrando um produto específico pelo id
router.get('/produtos/:id', function (req, res){
    return res.status(200).send('Buscando o produto: ' + req.params.id);
});

// Inserindo um produto
router.post('/produtos', function (req, res){
    return res.status(200).send('Cadastrando os produtos!');
});

// Atualizando um produto específico pelo id
router.put('/produtos/:id', function (req, res){
    return res.status(200).send('Atualizando o produto: ' + req.params.id);
});

// Deletando um produto específico pelo id
router.delete('/produtos/:id', function (req, res){
    return res.status(200).send('Removendo o produto: ' + req.params.id);
});

module.exports = router;