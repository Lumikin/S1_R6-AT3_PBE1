// Este arquivo tem ordem de execução! coloque o codigo em sua ordem correta
const express = require("express")
const { router } = require('./src/routes/routes')
const app = express()
const PORT = 8081
app.use(express.json())

// Coloque essa parte do codigo no final
app.use('/', router)
app.listen(PORT, () => {
    console.log(`Servidor respondendo em http://localhost:${PORT}`);
})