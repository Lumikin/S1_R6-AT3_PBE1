const { entregaModel } = require("../model/entregaModel");
const entregaController = {
    // lista todas as entregas
    listarEntregas: async (req, res) => {
        try {
            const resultado = await entregaModel.selecionarTodasEntregas();
            // Verificar se há registros na tabela
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({
                    message: "A tabela Entregas não contém registros",
                });
            }
            res.status(200).json({
                message: "Resultado dos dados listados:",
                data: resultado,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message,
            });
        }
    },

    // adiciona uma nova entrega
    adicionarEntregas: async (req, res) => {
        try {
            const fkPedido = Number(req.params.idPedido);
            const { status } = req.body;
            // valida o ID do pedido
            if (!fkPedido || isNaN(fkPedido) || fkPedido <= 0) {
                return res.status(400).json({
                    message: "Voce deve inserir um numero valido do pedido!!",
                });
            }

            // valida o status da entrega
            if (status !== "entregue" && status !== "transitando" && status !== "cancelado") {
                return res.status(400).json({ message: "Verifique se os status de entrega estao digitados: entregue, transitando ou cancelado", });
            }
            // incluir a nova entrega
            const resultado = await entregaModel.incluirEntregas(fkPedido, status);
            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: "Registro não encontrado!" })
            }
            return res.status(200).json({ message: "Entrega incluida com sucesso!", data: resultado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor." });
        }
    },
};

module.exports = { entregaController };