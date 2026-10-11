const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'sde.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado ao banco SQLite.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        serie TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS disciplinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        professor TEXT,
        cor TEXT,
        id_usuario INTEGER NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS atividades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        tipo TEXT NOT NULL,
        descricao TEXT,
        data TEXT NOT NULL,
        hora TEXT,
        status TEXT DEFAULT 'PENDENTE',
        id_disciplina INTEGER NOT NULL,
        FOREIGN KEY (id_disciplina) REFERENCES disciplinas(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS metas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        data_alvo TEXT NOT NULL,
        horas_previstas INTEGER DEFAULT 0,
        horas_realizadas INTEGER DEFAULT 0,
        status TEXT DEFAULT 'EM_ANDAMENTO',
        id_usuario INTEGER NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS lembretes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_hora TEXT NOT NULL,
        tipo TEXT NOT NULL,
        enviado INTEGER DEFAULT 0,
        id_atividade INTEGER NOT NULL,
        FOREIGN KEY (id_atividade) REFERENCES atividades(id)
    )`);
});

module.exports = db;