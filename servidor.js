//const express = require("express") // padrão antigo
import express from "express" //igual o python e java(metodo mais atualizado)
const PORTA = 5000
const app = express()
app.use(express.json())


let listarAlunos = [
    { id: 1, nome: "Isac" },
    { id: 2, nome: "Vitor" },       //qual é o indice?
    { id: 3, nome: "Arthur" },      //
    { id: 4, nome: "Kauan" },
    { id: 5, nome: "Marçal" },
    { id: 6, nome: "Leo" },
    { id: 7, nome: "João" },
    { id: 8, nome: "Coelhino" },
    { id: 9, nome: "Olívia" },
    { id: 10, nome: "Nick" },
]

app.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    const aluno = listarAlunos.find(a => a.id === id)
    //console.log(aluno)
    if (!aluno) {
        return res.status(404).json({ msg: "Aluno nao encontrado" })
    }
    res.status(200).json(aluno)
})

app.get("/", (req, res) => {
    res.status(200).json({          //end point, primeira rota "/"
        msg: "Hello World 🌍"
    })
})

app.get("/alunos", (req, res) => {
    res.status(200).json(listarAlunos)  //Busca alunos na URL exemplo: "http:/localhost:5000/alunos"
})

app.put("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    const indiceAluno = listarAlunos.findIndex(a => a.id === id)  //9
    console.log(indiceAluno)

    const { nome } = req.body
    if (indiceAluno === -1) {
        return res.status(404).json({ msg: "Aluno não Encontrado" })
    }
    if (!nome) {
        return res.status(400).json({ msg: "Gentileza preencher o nome:" })
    }
    listarAlunos[indiceAluno] = { id, nome }
    res.status(200).json({ msg: "Alteração Feita com Sucesso!" })
})

app.delete("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    const aluno = listarAlunos.findIndex(a => a.id === id)
    console.log(aluno)
    if (aluno === -1){
        return res.status(404).json({msg:"Aluno Não Encontrado!"})
    }
    listarAlunos.splice(aluno, 1)
    return res.status(200).json({msg:"Aluno removido com sucessp!"})
})

app.post("/alunos",(req,res)=>{
    console.log(req.body)
    const {nome} = req.body
    if (!nome){
        return res.status(400).json({msg:"Por gentileza digite seu nome:"})
    }
    const id=listarAlunos.length > 0 ?listarAlunos [listarAlunos.length -1].id +1 : 1
    const aluno ={id,nome}
    listarAlunos.push(aluno)
    return res.status(201).json({msg:"Aluno criado com sucesso!"})

})

app.put("/alunos/", (req, res) => {
    const id = req.params.id ? Number(req.params.id) : 0
    console.log("parametro:", req.params)
    if (id === 0) {
        return res.status(400).json({ msg: "Gentileza Digitar o ID!" })
    }
})


app.listen(PORTA, () => {
    console.log(`Servidor rodando!!✅`)  //retorno void ou vazio 
})



