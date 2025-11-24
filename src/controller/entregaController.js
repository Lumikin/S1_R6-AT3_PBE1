const { entregaModel } = require("../model/entregaModel");

const entregaController = {

    criarEntrega: async (req, res) => {
        try {
            const { pedido_id, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, statusEntrega } = req.body;

            if (!pedido_id) {
                return res.status(400).json({
                    message: 'O campo pedido_id é obrigatório.'
                });
            }

            const camposObrigatorios = [valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto];

           

            const resultado = await entregaModel.adicionarEntrega(
                pedido_id, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, statusEntrega || 'calculado');

            return res.status(201).json({
                message: 'Entrega registrada com sucesso.',
                data: resultado
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                errorMessage: error.message
            });
        }
    }
};

module.exports = { entregaController };
