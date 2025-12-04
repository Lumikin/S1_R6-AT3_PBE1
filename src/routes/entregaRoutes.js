const express = require('express')
const entregaRoutes = express.Router()
const { entregaController } = require('../controller/entregaController');

entregaRoutes.get('/entregas', entregaController.listarEntregas);
entregaRoutes.post('/entregas/:idPedido', entregaController.adicionarEntregas);
entregaRoutes.delete('/entregas/:id', entregaController.deletarEntrega)


module.exports = { entregaRoutes }

