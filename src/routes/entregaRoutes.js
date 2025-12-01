<<<<<<< HEAD
const express = require('express')
const entregaRoutes = express.Router()
const { entregaController } = require('../controller/entergaController');

entregaRoutes.get('/Entregas', entregaController.listarEntregas);
entregaRoutes.post('/Entregas/:idPedido', entregaController.adicionarEntregas);

module.exports = { entregaRoutes }
=======
const express = require('express');
const entregaRoutes = express.Router();

const {entregaController} = require("../controller/entregaController");

entregaRoutes.post('/entregas', entregaController.criarEntrega );

module.exports = { entregaRoutes };
>>>>>>> 03743437a293e361870c595ff4ae4a13e11bdf94
