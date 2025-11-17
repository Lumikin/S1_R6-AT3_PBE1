const express = require('express')
const clienteRoutes = express.Router()
const { clienteController } = require('../controller/clienteController');

clienteRoutes.get('/Clientes', clienteController.selecionarTodosClientes);
clienteRoutes.get('/Clientes/:id', clienteController.selecionarId);

module.exports = { clienteRoutes }