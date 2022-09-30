const express = require('express');
const produtoController = require('../controller/produto-controller');
const router = express.Router();

router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.listarProdutoById);
router.post('/', produtoController.postProduto);
router.put('/:id', produtoController.attProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;