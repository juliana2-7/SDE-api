const db = require('../database/db');

// Criar atividade
exports.criar = (req, res) => {
    const { titulo, tipo, descricao, data, hora, id_disciplina } = req.body;
    if (!titulo || !tipo || !data || !id_disciplina) {
        return res.status(400).json({ erro: 'Título, tipo, data e id_disciplina são obrigatórios.' });
    }
    db.run(`INSERT INTO atividades (titulo, tipo, descricao, data, hora, id_disciplina) VALUES (?, ?, ?, ?, ?, ?)`,
        [titulo, tipo, descricao || '', data, hora || '', id_disciplina],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao criar atividade.' });
            res.status(201).json({ id: this.lastID, titulo, tipo, descricao, data, hora, id_disciplina });
        });
};

// Listar atividades de uma disciplina
exports.listar = (req, res) => {
    const { id_disciplina } = req.params;
    db.all(`SELECT * FROM atividades WHERE id_disciplina = ?`, [id_disciplina], (err, rows) => {
        if (err) return res.status(500).json({ erro: 'Erro ao listar atividades.' });
        res.json(rows);
    });
};

// Editar atividade
exports.editar = (req, res) => {
    const { id } = req.params;
    const { titulo, tipo, descricao, data, hora, status } = req.body;
    db.run(`UPDATE atividades SET titulo = ?, tipo = ?, descricao = ?, data = ?, hora = ?, status = ? WHERE id = ?`,
        [titulo, tipo, descricao, data, hora, status, id],
        function (err) {
            if (err) return res.status(500).json({ erro: 'Erro ao editar atividade.' });
            if (this.changes === 0) return res.status(404).json({ erro: 'Atividade não encontrada.' });
            res.json({ mensagem: 'Atividade atualizada com sucesso.' });
        });
};

// Excluir atividade
exports.excluir = (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM atividades WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ erro: 'Erro ao excluir atividade.' });
        if (this.changes === 0) return res.status(404).json({ erro: 'Atividade não encontrada.' });
        res.json({ mensagem: 'Atividade excluída com sucesso.' });
    });
};