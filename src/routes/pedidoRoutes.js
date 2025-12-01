const express = require('express');
const pedidoRoutes = express.Router();

const { pedidoController } = require("../controller/pedidoController");

pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.delete('/pedidos/:idPedido', pedidoController.excluirPedido);
pedidoRoutes.get('/pedidos', pedidoController.buscarTodosPedidos);
pedidoRoutes.put('/pedidos/:idPedido', pedidoController.atualizarPedido);
pedidoRoutes.get('/pedidos/:idPedido', pedidoController.buscarPorId);


module.exports = { pedidoRoutes };