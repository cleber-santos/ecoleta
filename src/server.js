const express = require("express")
const server = express()

// Configurar pasta publica
server.use(express.static("public"))

// Configurar caminhos da minha aplicação
// Home - Página inicial
server.get("/", (req, res) => {
    // req: Requisição
    // res: Resposta
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

// ligar o servidor
server.listen(9000)
