const { pedidoModel } = require("../model/pedidoModel");

const pedidoController = {

    criarPedido: async (req, res) => {
        try {
            const { idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg } = req.body;


            if (!idClientes || !dataPedido || !distanciaPedido || !pesoCarga || !valorKm || !valorKg) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser enviados."
                });
            };

            const resultado = await pedidoModel.insertPedido(idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg);
            console.log(resultado);

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
    },

    buscarPorId: async (req, res) => {
        try {
            const { idPedido } = req.params;
            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }
            const pedido = await pedidoModel.buscarPorId(idPedido);
            if (!pedido) {
                return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
            }
            return res.status(200).json(pedido);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar pedido.', detalhes: error.message });
        }
    },

    excluirPedido: async (req, res) => {
        try {
            const { idPedido } = req.params;

            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }

            const pedidosExistente = await pedidoModel.buscarPorId(idPedido);

            if (!pedidosExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            await pedidoModel.excluirPedido(idPedido);
            return res.status(200).json({ mensagem: 'Pedido excluído com sucesso.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao excluir pedido.', detalhes: error.message });
        }
    },

    buscarTodosPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.selecionarTodosPedidos();
            return res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar pedidos.', detalhes: error.message });
        }
    },

    atualizarPedido: async (req, res) => {
        try {
            const { idPedido } = req.params;
            const { idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg } = req.body;
            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }
            await pedidoModel.atualizarPedido(idPedido, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg);
            return res.status(200).json({ mensagem: 'Pedido atualizado com sucesso.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao atualizar pedido.', detalhes: error.message });
        }
    }
};



module.exports = { pedidoController };
