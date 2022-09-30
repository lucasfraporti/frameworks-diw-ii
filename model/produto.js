const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    name: String,
    price: Number,
},
{
    versionKey: false
});

module.exports = mongoose.model('Produto', produtoSchema);