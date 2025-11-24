const express = require('express');
const pedidoRoutes = express.Router();

const { pedidoController } = require("../controller/pedidoController");

pedidoRoutes.post('/pedidos', pedidoController.criarPedido);

module.exports = { pedidoRoutes };