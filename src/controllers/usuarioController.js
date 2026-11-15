const db = require('../database/db');
const bcrypt = require('bcryptjs');

// Cadastrar Usuário
exports.cadastrar = async (req, res) => {
    const { nome, email, senha, serie } = req.body;
    
    if (!nome || !email || !senha || !serie) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    try {
        // Embaralha a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        db.run(`INSERT INTO usuarios (nome, email, senha, serie) VALUES (?, ?, ?, ?)`,
            [nome, email, senhaHash, serie],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ erro: 'E-mail já cadastrado.' });
                    }
                    return res.status(500).json({ erro: 'Erro ao cadastrar.' });
                }
                res.status(201).json({ id: this.lastID, nome, email, serie });
            });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao processar a senha.' });
    }
};

// Login
exports.login = (req, res) => {
    const { email, senha } = req.body;
    
    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, row) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor.' });
        if (!row) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });

        // Compara a senha digitada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, row.senha);
        
        if (!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
        }

        res.json({ id: row.id, nome: row.nome, email: row.email, serie: row.serie });
    });
};