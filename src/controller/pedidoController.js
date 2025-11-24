const { pedidoModel } = require("../model/pedidoModel");

const pedidoController = {

    criarPedido: async (req, res) => {
        try {
            const { idClientes, dataPedido, tipoEntrega, distanciaPedido, pesoCarga, valorKm, valorKg } = req.body;


            if (!idClientes || !dataPedido || !tipoEntrega || !distanciaPedido || !pesoCarga || !valorKm || !valorKg) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser enviados."
                });
            }

            const resultado = await pedidoModel.insertPedido( idClientes, dataPedido, tipoEntrega, distanciaPedido, pesoCarga, valorKm, valorKg );

            return res.status(201).json({
                mensagem: "Pedido criado com sucesso!",
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                erro: "Erro ao criar pedido",
                detalhes: error.message
            });
        }
    }

};

module.exports = { pedidoController };
