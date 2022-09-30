const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String
},
{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);