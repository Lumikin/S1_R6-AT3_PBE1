const { pedidoModel } = require("../model/pedidoModel");

const pedidoController = {

    // cria um novo pedido
    criarPedido: async (req, res) => {
        try {
            const { idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega } = req.body;
            //Validação do tipoEntrega
            if (tipoEntrega !== "normal" && tipoEntrega !== "urgente") {
                return res.status(400).json({
                    message: "Verifique se o tipoEntrega esta igual a: normal ou urgente!"
                })
            }
            // Validação básica dos dados recebidos
            if (!idClientes || !dataPedido || !distanciaPedido || !pesoCarga || !valorKm || !valorKg || isNaN(valorKg) || isNaN(valorKm)) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser enviados."
                });
            };
            // Insere o novo pedido no banco de dados
            const resultado = await pedidoModel.insertPedido(idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega);
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

    // busca um pedido pelo ID
    buscarPorId: async (req, res) => {
        try {
            const { idPedido } = req.params;

            // Valida o ID do pedido
            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }
            const pedido = await pedidoModel.buscarPorId(idPedido);

            // Verifica se o pedido foi encontrado
            if (!pedido) {
                return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
            }
            return res.status(200).json(pedido);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar pedido.', detalhes: error.message });
        }
    },

    // exclui um pedido pelo ID
    excluirPedido: async (req, res) => {
        try {
            const { idPedido } = req.params;

            // Valida o ID do pedido
            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }

            const pedidosExistente = await pedidoModel.buscarPorId(idPedido);

            // Verifica se o pedido existe
            if (!pedidosExistente) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }

            // Exclui o pedido
            await pedidoModel.excluirPedido(idPedido);
            return res.status(200).json({ mensagem: 'Pedido excluído com sucesso.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao excluir pedido.', detalhes: error.message });
        }
    },

    // busca todos os pedidos
    buscarTodosPedidos: async (req, res) => {
        try {
            const pedidos = await pedidoModel.selecionarTodosPedidos();
            return res.status(200).json(pedidos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar pedidos.', detalhes: error.message });
        }
    },

    // atualiza um pedido pelo ID
    atualizarPedido: async (req, res) => {
        try {
            const { idPedido } = req.params;
            const { idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega } = req.body;
            if (tipoEntrega !== "normal" && tipoEntrega !== "urgente") {
                return res.status(400).json({
                    message: "Verifique se o tipoEntrega esta igual a: normal ou urgente!"
                })
            }

            // Validação básica dos dados recebidos
            if (!idClientes || !dataPedido || !distanciaPedido || !pesoCarga || !valorKm || !valorKg || isNaN(valorKg) || isNaN(valorKm)) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser enviados."
                });
            };

            // Valida o ID do pedido
            if (!idPedido) {
                return res.status(400).json({ mensagem: 'O id do pedido é obrigatório.' });
            }

            // Verifica se o pedido existe
            const resultado = await pedidoModel.atualizarPedido(idPedido, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega);
            return res.status(200).json({ mensagem: 'Pedido atualizado com sucesso.', data: resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao atualizar pedido.', detalhes: error.message });
        }
    },

};



module.exports = { pedidoController };
