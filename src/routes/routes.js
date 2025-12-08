const express = require('express');
const router = express.Router();

//Referência do arquivo de rotas
const { pedidoRoutes } = require('./pedidoRoutes')
const { entregaRoutes } = require('./entregaRoutes')

router.use('/', pedidoRoutes);
router.use('/', entregaRoutes);

module.exports = { router };