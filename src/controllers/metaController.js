const db = require('../database/db');

// Criar meta
exports.criar = (req, res) => {
    const { titulo, descricao, data_alvo, horas_previstas, id_usuario } = req.body;
    if (!titulo || !data_alvo || !id_usuario) {
        return res.status(400).json({ erro: 'Título, data_alvo e id_usuario são obrigatórios.' });
    }
    db.run(`INSERT INTO metas (titulo, descricao, data_alvo, horas_previstas, id_usuario) VALUES (?, ?, ?, ?, ?)`,
        [titulo, descricao || '', data_alvo, horas_previstas || 0, id_usuario],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao criar meta.' });
            res.status(201).json({ id: this.lastID, titulo, descricao, data_alvo, horas_previstas, id_usuario });
        });
};

// Listar metas de um usuário
exports.listar = (req, res) => {
    const { id_usuario } = req.params;
    db.all(`SELECT * FROM metas WHERE id_usuario = ?`, [id_usuario], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar metas.' });
        res.json(rows);
    });
};

// Editar meta
exports.editar = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_alvo, horas_previstas, horas_realizadas, status } = req.body;
    db.run(`UPDATE metas SET titulo = ?, descricao = ?, data_alvo = ?, horas_previstas = ?, horas_realizadas = ?, status = ? WHERE id = ?`,
        [titulo, descricao, data_alvo, horas_previstas, horas_realizadas, status, id],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao editar meta.' });
            if (this.changes === 0) return res.status(404).json({ erro: 'Meta não encontrada.' });
            res.json({ mensagem: 'Meta atualizada com sucesso.' });
        });
};

// Excluir meta
exports.excluir = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM metas WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir meta.' });
        if (this.changes === 0) return res.status(404).json({ erro: 'Meta não encontrada.' });
        res.json({ mensagem: 'Meta excluída com sucesso.' });
    });
};