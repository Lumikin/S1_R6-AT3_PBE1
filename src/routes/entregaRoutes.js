const express = require('express');
const entregaRoutes = express.Router();

const {entregaController} = require("../controller/entregaController");

entregaRoutes.post('/entregas', entregaController.criarEntrega );

module.exports = { entregaRoutes };