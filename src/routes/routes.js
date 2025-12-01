const express = require('express');
const router = express.Router();

//Referência do arquivo de rotas
const { clentesRoutes } = require('./clienteRoutes')
const { pedidoRoutes } = require('./pedidoRoutes')
const { entregaRoutes } = require('./entregaRoutes')

router.use('/', pedidoRoutes);
router.use('/', clentesRoutes);
router.use('/', entregaRoutes);

module.exports = { router };