const express = require('express');
const router = express.Router();

//Referência do arquivo de rotas
const { pedidoRoutes } = require('./pedidoRoutes')

router.use('/', pedidoRoutes);

module.exports = { router };