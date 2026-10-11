const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const atividadeRoutes = require('./routes/atividadeRoutes');
const metaRoutes = require('./routes/metaRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/atividades', atividadeRoutes);
app.use('/metas', metaRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API do Sistema Diário de Estudos está funcionando! 🚀' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});