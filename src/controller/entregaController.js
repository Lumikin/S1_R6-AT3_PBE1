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
            if (rowsPedido.length === 0) {
                throw new Error("Não foi possivel localizar o pedido")
            }
            const ConsultaPedido = entregaModel.consultarPedido(fkPedido)
            const pedido = fkPedido.rowsPedido[0];

            const valorDistancia = pedido.valorKm * pedido.distanciaPedido;
            const valorPeso = pedido.valorKg * pedido.pesoCarga;
            const valorBase = valorDistancia + valorPeso;
            const tipoEntrega = pedido.tipoEntrega

            // Cálculo do acréscimo baseado no tipo de entrega
            let acrescimo = 0;
            if (tipoEntrega == "urgente") {
                acrescimo = valorBase * 0.2;
            } else {
                acrescimo = 0
            }

            const valorFinalParcial = valorBase + acrescimo;

            // Cálculo do desconto para valores acima de R$ 500,00
            let desconto = 0;
            if (valorFinalParcial > 500) {
                desconto = valorFinalParcial * 0.1;
            }
            // Cálculo da taxa extra para cargas acima de 50kg
            let taxaExtra = 0;
            if (pedido.pesoCarga > 50) {
                taxaExtra = 15;
            }

            const valorFinal = valorFinalParcial - desconto + taxaExtra;
            // valida o status da entrega
            if (status !== "entregue" && status !== "transitando" && status !== "cancelado" && status !== "espera") {
                return res.status(400).json({ message: "Verifique se os status de entrega estao digitados: entregue, transitando, espera ou cancelado", });
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

    deletarEntrega: async (req, res) => {
        try {
            const id = Number(req.params.id)
            // VALIDAÇÃO DO ID
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
            const consulta = await entregaModel.selecionarEntrega(id);
            if (consulta.length === 0) {
                throw new Error("Registro não localizado");

            }
            else {
                // REALIZA A EXCLUSÃO
                const resultado = await entregaModel.deletarEntregas(id);
                if (resultado.affectedRows === 1) {
                    res.status(201).json({ message: "Entrega excluida com sucesso ", data: resultado })
                }
                else {
                    throw new Error("Não foi possivel excluir a Entrega");

                }
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })

            if (error == (1451)) {
                return res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
            }
        }
    }
};

module.exports = { entregaController };