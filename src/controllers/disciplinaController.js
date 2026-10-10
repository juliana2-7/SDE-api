const db = require('../database/db');

// Criar disciplina
exports.criar = (req, res) => {
    const { nome, professor, cor, id_usuario } = req.body;
    if (!nome || !id_usuario) {
        return res.status(400).json({ erro: 'Nome e id_usuario são obrigatórios.' });
    }
    db.run(`INSERT INTO disciplinas (nome, professor, cor, id_usuario) VALUES (?, ?, ?, ?)`,
        [nome, professor || '', cor || '', id_usuario],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao criar disciplina.' });
            res.status(201).json({ id: this.lastID, nome, professor, cor, id_usuario });
        });
};

// Listar disciplinas de um usuário
exports.listar = (req, res) => {
    const { id_usuario } = req.params;
    db.all(`SELECT * FROM disciplinas WHERE id_usuario = ?`, [id_usuario], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar disciplinas.' });
        res.json(rows);
    });
};

// Editar disciplina
exports.editar = (req, res) => {
    const { id } = req.params;
    const { nome, professor, cor } = req.body;
    db.run(`UPDATE disciplinas SET nome = ?, professor = ?, cor = ? WHERE id = ?`,
        [nome, professor, cor, id],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao editar disciplina.' });
            if (this.changes === 0) return res.status(404).json({ erro: 'Disciplina não encontrada.' });
            res.json({ mensagem: 'Disciplina atualizada com sucesso.' });
        });
};

// Excluir disciplina
exports.excluir = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM disciplinas WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir disciplina.' });
        if (this.changes === 0) return res.status(404).json({ erro: 'Disciplina não encontrada.' });
        res.json({ mensagem: 'Disciplina excluída com sucesso.' });
    });
};