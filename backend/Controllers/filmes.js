import { db } from "../db.js";

// READ - Listar todos os filmes
export const getFilmes = (_, res) => {
    const q = "SELECT * FROM filmes";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar filmes.", details: err });
        return res.status(200).json(data);
    });
};

// CREATE - Cadastrar novo filme
export const createFilmes = (req, res) => {
    const { nome, genero, diretor, ano_lancamento, pais, premios } = req.body;

    if (!nome || !genero || !diretor || !ano_lancamento || !pais || !premios) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const q = `
        INSERT INTO filmes 
        (nome, genero, diretor, ano_lancamento, pais, premios) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, genero, diretor, ano_lancamento, pais, premios];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao criar filme no banco de dados.", details: err });
        }

        return res.status(201).json({ 
            message: "Filme criado com sucesso!", 
            id: data.insertId 
        });
    });
};

// UPDATE - Atualizar um filme existente
export const updateFilmes = (req, res) => {
    const { id } = req.params;
    const { nome, genero, diretor, ano_lancamento, pais, premios } = req.body;

    if (!nome || !genero || !diretor || !ano_lancamento || !pais || !premios) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const q = `
        UPDATE filmes 
        SET nome = ?, genero = ?, diretor = ?, ano_lancamento = ?, pais = ?, premios = ? 
        WHERE idfilmes = ?
    `;
    const values = [nome, genero, diretor, ano_lancamento, pais, premios, id];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao atualizar filme no banco de dados.", details: err });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }

        return res.status(200).json({ message: "Filme atualizado com sucesso!" });
    });
};

// DELETE - Remover um filme
export const deleteFilmes = (req, res) => {
    const { id } = req.params;

    const q = "DELETE FROM filmes WHERE idfilmes = ?";
    const values = [id];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao deletar filme no banco de dados.", details: err });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }

        return res.status(200).json({ message: "Filme deletado com sucesso!" });
    });
};
