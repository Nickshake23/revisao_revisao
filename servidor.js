// =====================
// IMPORTAÇÕES
// =====================
import express from "express"
import cors from "cors"
import { conexao } from "./db.js"
import path from "path"
import { fileURLToPath } from "url"

// =====================
// CONFIG
// =====================
const app = express()
const PORTA = 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// =====================
// MIDDLEWARES
// =====================
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

// =====================
// ROTA TESTE
// =====================
app.get("/", (req, res) => {
    res.json({ msg: "API funcionando 🚀" })
})

/* =========================================================
   ======================= ALUNOS ==========================
   ========================================================= */

// CREATE
app.post("/alunos", async (req, res) => {
    const { nome } = req.body
    if (!nome) return res.status(400).json({ msg: "Nome é obrigatório" })

    try {
        const [resultado] = await conexao.query(
            "INSERT INTO alunos (NOME) VALUES (?)",
            [nome]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome
        })
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: "Erro ao criar aluno" })
    }
})

// READ (todos)
app.get("/alunos", async (req, res) => {
    try {
        const [resultado] = await conexao.query(
            "SELECT ID, NOME FROM alunos ORDER BY ID"
        )
        res.json(resultado)
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar alunos" })
    }
})

// READ (por id)
app.get("/alunos/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ msg: "ID inválido" })

    try {
        const [resultado] = await conexao.query(
            "SELECT ID, NOME FROM alunos WHERE ID = ?",
            [id]
        )

        if (resultado.length === 0)
            return res.status(404).json({ msg: "Aluno não encontrado" })

        res.json(resultado[0])
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar aluno" })
    }
})

// UPDATE
app.put("/alunos/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { nome } = req.body

    if (isNaN(id) || !nome)
        return res.status(400).json({ msg: "Dados inválidos" })

    try {
        const [resultado] = await conexao.query(
            "UPDATE alunos SET NOME = ? WHERE ID = ?",
            [nome, id]
        )

        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "Aluno não encontrado" })

        res.json({ msg: "Aluno atualizado" })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar aluno" })
    }
})

// DELETE
app.delete("/alunos/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ msg: "ID inválido" })

    try {
        const [resultado] = await conexao.query(
            "DELETE FROM alunos WHERE ID = ?",
            [id]
        )

        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "Aluno não encontrado" })

        res.json({ msg: "Aluno removido" })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover aluno" })
    }
})

/* =========================================================
   ======================= CURSOS ==========================
   ========================================================= */

// CREATE
app.post("/cursos", async (req, res) => {
    const { nome_curso } = req.body
    if (!nome_curso)
        return res.status(400).json({ msg: "nome_curso é obrigatório" })

    try {
        const [resultado] = await conexao.query(
            "INSERT INTO cursos (NOME_CURSO) VALUES (?)",
            [nome_curso]
        )

        res.status(201).json({
            id: resultado.insertId,
            nome_curso
        })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao criar curso" })
    }
})

// READ
app.get("/cursos", async (req, res) => {
    try {
        const [resultado] = await conexao.query(
            "SELECT ID, NOME_CURSO FROM cursos ORDER BY ID"
        )
        res.json(resultado)
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar cursos" })
    }
})

// UPDATE
app.put("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id)
    const { nome_curso } = req.body

    if (isNaN(id) || !nome_curso)
        return res.status(400).json({ msg: "Dados inválidos" })

    try {
        const [resultado] = await conexao.query(
            "UPDATE cursos SET NOME_CURSO = ? WHERE ID = ?",
            [nome_curso, id]
        )

        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "Curso não encontrado" })

        res.json({ msg: "Curso atualizado" })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao atualizar curso" })
    }
})

// DELETE
app.delete("/cursos/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ msg: "ID inválido" })

    try {
        const [resultado] = await conexao.query(
            "DELETE FROM cursos WHERE ID = ?",
            [id]
        )

        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "Curso não encontrado" })

        res.json({ msg: "Curso removido" })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover curso" })
    }
})

/* =========================================================
   ===================== MATRÍCULAS ========================
   ========================================================= */

// CREATE
app.post("/matriculas", async (req, res) => {
    const { aluno_id, curso_id } = req.body

    if (!aluno_id || !curso_id)
        return res.status(400).json({ msg: "aluno_id e curso_id são obrigatórios" })

    try {
        await conexao.query(
            "INSERT INTO matriculas (ALUNO_ID, CURSOS_ID) VALUES (?, ?)",
            [aluno_id, curso_id]
        )

        res.status(201).json({ msg: "Matrícula criada com sucesso" })
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: "Erro ao criar matrícula" })
    }
})

// READ (com JOIN)
app.get("/matriculas", async (req, res) => {
    try {
        const [resultado] = await conexao.query(`
            SELECT
                m.ID,
                a.NOME AS aluno,
                c.NOME_CURSO AS curso
            FROM matriculas m
            JOIN alunos a ON m.ALUNO_ID = a.ID
            JOIN cursos c ON m.CURSOS_ID = c.ID
            ORDER BY m.ID
        `)

        res.json(resultado)
    } catch (erro) {
        console.error(erro)
        res.status(500).json({ erro: "Erro ao buscar matrículas" })
    }
})

// DELETE
app.delete("/matriculas/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ msg: "ID inválido" })

    try {
        const [resultado] = await conexao.query(
            "DELETE FROM matriculas WHERE ID = ?",
            [id]
        )

        if (resultado.affectedRows === 0)
            return res.status(404).json({ msg: "Matrícula não encontrada" })

        res.json({ msg: "Matrícula removida" })
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao remover matrícula" })
    }
})

// =====================
// SERVIDOR
// =====================
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA} ✅`)
})
