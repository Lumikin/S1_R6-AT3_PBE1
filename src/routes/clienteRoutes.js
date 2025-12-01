const express = require('express')
const clienteRoutes = express.Router()
const { clienteController } = require('../controller/clienteController');

clienteRoutes.get('/Clientes', clienteController.selecionarTodos);
clienteRoutes.post('/Clientes', clienteController.inserirCliente);
clienteRoutes.delete('/Clientes/:id', clienteController.removerCliente);
clienteRoutes.put('/Clientes/:idCliente', clienteController.alterarCliente);

module.exports = { clienteRoutes }