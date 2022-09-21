const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userLogin = (req, res, next) => {
    if(req.body.user === "Lucas" && req.body.password === "12345"){
        const token = jwt.sign({userId: 1}, process.env.SECRET, { expiresIn: 300 });
        return res.json({ auth: true, token });
    };
    res.status(401).end();
};

exports.verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(401).end();
        };
        req.userId = decoded.userId;
        next();
    });
};

exports.getAllUsers = (req, res) => {
    console.log(`O usuário ID: ${req.userId} utilizou esta rota com a segurança JWT`);
    User.find({}, (err, users) => {
    if(err){
        res.status(500).send(err);
    }
    res.json(users);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id, (err, user) => {
        if(err){
            res.status(500).send(err);
        }else if(user){
            res.json(user);
        }else{
            res.status(404).send('Usuário não encontrado');
        }
    });
};

exports.getUserByUsername = (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username }, (err, user) => {
        if(err){
            res.status(500).send(err);
        }else if(user){
            res.json(user);
        }else{
            res.status(404).send('Usuário não encontrado');
        }
    });
};

/*
A busca pelo username pode ser feita através de "Query Name"
localhost:3000/api/users/search?username=username

exports.searchByUsername = (req, res) => {
    if(req.query && req.query.nome){
        const paramNome = req.query.nome;
*/

exports.createUser = (req, res) => {
    const newUser = new User(req.body);

    if(newUser && newUser.name && newUser.email && newUser.username && newUser.password){
        const addUser = new User(newUser);
        addUser.save((err, user) => {
            if(err){
                res.status(500).send(err);
            }else{
                res.status(201).json(user);
            };
        });
    };
};

exports.attUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;

    if(!user || !user.name || !user.email || !user.username || !user.password){
        return res.status(400).json({error: 'Todas as informações são obrigatórias'});
    }else{
        User.findByIdAndUpdate(id, user, {new: true}, (err, user) => {
            if(err){
                res.status(500).send(err);
            }else if(user){
                res.status(201).json(user);
            }else{
                res.status(404).json({error: 'Produto não encontrado'});
            };
        });
    };
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id, (err, user) => {
        if(err){
            res.status(500).send(err);
        }else if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({error: `Produto com o ID: ${id} não encontrado`});
        };
    });
};