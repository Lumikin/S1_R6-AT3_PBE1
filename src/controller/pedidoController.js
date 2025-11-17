const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {

    criarPedido: async (req, res) => {
        try {
            const { idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg } = req.body;
            if (!idEntregas || !idClientes) {
                return res.status(400).json({
                    erro: "idEntregas e idClientes são obrigatórios"
                });
            }

            const resultado = await pedidoModel.insertPedido(idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg);

            return res.status(201).json({ mensagem: "Pedido criado com sucesso!", data: resultado});

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                erro: "Erro ao criar pedido"
            });
        }
    }

};

module.exports = { pedidoController };
