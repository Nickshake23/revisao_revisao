const API = "/alunos"

const tabelaBody = document.getElementById("tabelaAlunos")
const form = document.getElementById("formAluno")
const inputNome = document.getElementById("nome")

// =====================
// LISTAR
// =====================
async function carregarAlunos() {
    const res = await fetch(API)
    const alunos = await res.json()

    tabelaBody.innerHTML = ""

    alunos.forEach(aluno => {
        const tr = document.createElement("tr")

        tr.innerHTML = `
            <td>${aluno.ID}</td>
            <td>${aluno.NOME}</td>
            <td>
                <button class="edit" onclick="editarAluno(${aluno.ID}, '${aluno.NOME}')">✏️</button>
                <button class="delete" onclick="deletarAluno(${aluno.ID})">🗑️</button>
            </td>
        `
        tabelaBody.appendChild(tr)
    })
}

// =====================
// CRIAR
// =====================
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const nome = inputNome.value.trim()
    if (!nome) return alert("Digite um nome")

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    })

    inputNome.value = ""
    carregarAlunos()
})

// =====================
// EDITAR
// =====================
async function editarAluno(id, nomeAtual) {
    const novoNome = prompt("Novo nome:", nomeAtual)
    if (!novoNome || novoNome.trim() === "") return

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
    })

    carregarAlunos()
}

// =====================
// DELETAR
// =====================
async function deletarAluno(id) {
    if (!confirm("Deseja excluir este aluno?")) return

    await fetch(`${API}/${id}`, { method: "DELETE" })
    carregarAlunos()
}

// INICIAR
carregarAlunos()
