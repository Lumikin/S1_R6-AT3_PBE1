const express = require('express')
const entregaRoutes = express.Router()
const { entregaController } = require('../controller/entregaController');

entregaRoutes.get('/Entregas', entregaController.listarEntregas);
entregaRoutes.post('/Entregas/:idPedido', entregaController.adicionarEntregas);
entregaRoutes.delete('/entregas/:id', entregaController.deletarEntrega)

module.exports = { entregaRoutes }

