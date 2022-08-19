const express = require('express');
const app = express();
const port = 8001;

app.get('/produtos', (req, res) => {
    return res.status(200).send('Listando os produtos!');
});

app.post('/produtos', (req, res) => {
    return res.status(200).send('Cadastrando os produtos!');
});

app.get('/produtos/:id', (req, res) => {
    return res.status(200).send('Buscando o produto: ' + req.params.id);
});

app.put('/produtos/:id', (req, res) => {
    return res.status(200).send('Atualizando o produto: ' + req.params.id);
});

app.delete('/produtos/:id', (req, res) => {
    return res.status(200).send('Removendo o produto: ' + req.params.id);
});

app.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
})