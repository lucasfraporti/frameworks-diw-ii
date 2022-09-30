const Produto = require('../model/produto');

exports.listarProdutos = (req, res) => {
    Produto.find({}, (err, produtos) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(produtos);
    });
};

exports.listarProdutoById = (req, res) => {    
    const id = req.params.id; 
    Produto.findById(id, (err, produtoEncontrado) => {
        if(err){
            res.status(500).send(err);
        }else if(produtoEncontrado){
            return res.json(produtoEncontrado);
        }else{
            return res.status(404).json({
                message: 'Nenhum produto encontrado'
            });
        };
    });
};

exports.postProduto = (req, res) => {
    const produtoRequest = new Produto(req.body);
    if(produtoRequest && produtoRequest.name && produtoRequest.price){
        const produtoNovo = new Produto(produtoRequest);
        produtoNovo.save((err, produtoSalvo) => {
            if(err){
                res.status(500).send(err);
            }else{
                return res.status(201).json(produtoSalvo);
            };
        });
    };
};

exports.attProduto = (req, res) => {
    const id = req.params.id;
    const produtoRequest = req.body;
    if(!produtoRequest || !produtoRequest.name || !produtoRequest.price){
        return res.status(400).json({error: 'Nome e preço são obrigatórios'});
    };
    Produto.findByIdAndUpdate(id, produtoRequest, {new: true}, (err, produtoAtualizado) => {
        if(err){
            res.status(500).send(err);
        }else if(produtoAtualizado){
            res.status(200).json(produtoAtualizado);
        }else{
            res.status(404).json({
                error: 'Produto não encontrado'
            });
        };
    });
};

exports.deleteProduto = (req, res) => {
    const id = req.params.id;
    Produto.findByIdAndDelete(id, (err, produtoEncontrado) => {
        if(err){
            res.status(500).send(err);
        }else if(produtoEncontrado){
            return res.json(produtoEncontrado);
        }else{
            return res.status(404).json({
                message: `Não foi encontrado nenhum produto com o ID: ${id}`
            });
        };
    });
};