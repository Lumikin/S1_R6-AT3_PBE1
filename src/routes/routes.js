const express = require('express');
const router = express.Router();

//Referência do arquivo de rotas
const { pedidoRoutes } = require('./pedidoRoutes')
const { entregaRoutes } = require('./entregaRoutes')
const { clienteRoutes } = require('./clienteRoutes')

router.use('/', pedidoRoutes);
router.use('/', entregaRoutes);
router.use('/', clienteRoutes);

module.exports = { router };