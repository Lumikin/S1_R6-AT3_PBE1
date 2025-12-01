const express = require('express')
const entregaRoutes = express.Router()
const { entregaController } = require('../controller/entergaController');

entregaRoutes.get('/Entregas', entregaController.listarEntregas);
entregaRoutes.post('/Entregas/:idPedido', entregaController.adicionarEntregas);

module.exports = { entregaRoutes }