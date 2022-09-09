const Produto = require('../model/produto');

/* ================================================== */

/*
let é voltado para variáveis que irão mudar o seu valor
const é mais voltado para variáveis que não vão se modificar

const produtos = [
    { id: 1, name: 'Arroz', price: 4.5 },
    { id: 2, name: 'Bolacha', price: 2.5 },
    { id: 3, name: 'Doritos', price: 15 },
    { id: 4, name: 'Chocolate', price: 5.8 }
]

let idGerado = 5;
*/

/* ================================================== */

exports.listarProdutos = (req, res) => {
    // return res.status(200).json(produtos);
    Produto.find({}, (err, produtos) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(produtos);
    });
};

exports.listarProdutoId = (req, res) => {    
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

/*
Produto.find({_id: id}, (err, produtoEncontrado) => {
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

================================================================================================

const id = parseInt(req.params.id);

const produtoEncontrado = produtos.find((produto) => {
    return produto.id === id;
});

if(produtoEncontrado){
    res.json(produtoEncontrado);
}else{
    res.status(404).json({
        message: 'Nenhum produto encontrado'
    });
};
*/

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

/*
const novoProduto = req.body;
if(novoProduto && novoProduto.name && novoProduto.price){
    novoProduto.id = idGerado++;
    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
}else{
    return res.status(400).json({
        error: 'Produto inválido'
    });
};
*/

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

/*
const id = parseInt(req.params.id);
const produtoAlterar = req.body;

if(!produtoAlterar || !produtoAlterar.name || !produtoAlterar.price){
    return res.status(400).json({error: 'Nome e preço são obrigatórios'});
};

const produtoEncontrado = produtos.find((produto) => {
    return produto.id === id;
});

if(produtoEncontrado){
    produtoEncontrado.name = produtoAlterar.name;
    produtoEncontrado.price = produtoAlterar.price;
    return res.json(produtoEncontrado);
}else{
    return res.status(404).json({
        error: 'Produto não encontrado'
    });
};
*/

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

/*
const id = parseInt(req.params.id);

const indexProdutoEncontrado = produtos.findIndex(
    (produto) => {
        return produto.id === id;
    }
);

if(indexProdutoEncontrado >= 0){
    return res.json(produtos.splice(indexProdutoEncontrado, 1)[0]);
}else{
    return res.status(404).json({
        error: 'Produto não encontrado'
    });
};
*/
