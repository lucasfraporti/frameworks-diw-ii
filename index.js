const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.json({mensagem: 'OK'});
});

app.listen(8001, () => {
    console.log('Rodando na porta 8001');
});