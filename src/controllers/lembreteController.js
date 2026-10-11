const db = require('../database/db');

// Criar lembrete
exports.criar = (req, res) => {
    const { data_hora, tipo, id_atividade } = req.body;
    if (!data_hora || !tipo || !id_atividade) {
        return res.status(400).json({ erro: 'data_hora, tipo e id_atividade são obrigatórios.' });
    }
    db.run(`INSERT INTO lembretes (data_hora, tipo, id_atividade) VALUES (?, ?, ?)`,
        [data_hora, tipo, id_atividade],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao criar lembrete.' });
            res.status(201).json({ id: this.lastID, data_hora, tipo, id_atividade });
        });
};

// Listar lembretes de uma atividade
exports.listar = (req, res) => {
    const { id_atividade } = req.params;
    db.all(`SELECT * FROM lembretes WHERE id_atividade = ?`, [id_atividade], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar lembretes.' });
        res.json(rows);
    });
};

// Editar lembrete
exports.editar = (req, res) => {
    const { id } = req.params;
    const { data_hora, tipo, enviado } = req.body;
    db.run(`UPDATE lembretes SET data_hora = ?, tipo = ?, enviado = ? WHERE id = ?`,
        [data_hora, tipo, enviado, id],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao editar lembrete.' });
            if (this.changes === 0) return res.status(404).json({ erro: 'Lembrete não encontrado.' });
            res.json({ mensagem: 'Lembrete atualizado com sucesso.' });
        });
};

// Excluir lembrete
exports.excluir = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM lembretes WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir lembrete.' });
        if (this.changes === 0) return res.status(404).json({ erro: 'Lembrete não encontrado.' });
        res.json({ mensagem: 'Lembrete excluído com sucesso.' });
    });
};