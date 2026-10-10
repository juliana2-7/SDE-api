const db = require('../database/db');

exports.cadastrar = (req, res) => {
    const { nome, email, senha, serie } = req.body;
    if (!nome || !email || !senha || !serie) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    db.run(`INSERT INTO usuarios (nome, email, senha, serie) VALUES (?, ?, ?, ?)`,
        [nome, email, senha, serie],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ erro: 'E-mail já cadastrado.' });
                }
                return res.status(500).json({ erro: 'Erro ao cadastrar.' });
            }
            res.status(201).json({ id: this.lastID, nome, email, serie });
        });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    db.get(`SELECT * FROM usuarios WHERE email = ? AND senha = ?`, [email, senha], (err, row) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor.' });
        if (!row) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        res.json({ id: row.id, nome: row.nome, email: row.email, serie: row.serie });
    });
};