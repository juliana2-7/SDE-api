const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
    res.json({
        mensagem: 'API do Diário de Estudos funcionando!'
    });
});

app.listen(PORT, () => {
    console.log('API rodando em http://localhost:3000');
});