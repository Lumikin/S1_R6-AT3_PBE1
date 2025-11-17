const express = require('express')
const clienteRoutes = express.Router()
const { clienteController } = require('../controller/clienteController');

clienteRoutes.get('/Clientes', clienteController.selecionarTodosClientes);

module.exports = { clienteRoutes }