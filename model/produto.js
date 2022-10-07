const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    name: String,
    price: Number,
},
{
    versionKey: false,
    // collection: 'nome_da_collection'
});

module.exports = mongoose.model('Produto', produtoSchema);
// Nome da collection será "produtos", ele se baseia nesse 'Produto'