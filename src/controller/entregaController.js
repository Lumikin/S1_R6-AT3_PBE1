const { entregaModel } = require("../model/entregaModel");
const entregaController = {

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const entregas = await entregaController.listarEntregas(req, res);
     * // Saída:
     * // [
     * //   {
     * //     idEntregas: 1,
     * //     idPedido: 5,
     * //     valorDistancia: 150.00,
     * //     valorPeso: 75.00,
     * //     acrescimo: 45.00,
     * //     taxaExtra: 15.00,
     * //     valorFinal: 285.00,
     * //     desconto: 0.00,
     * //     tipoEntrega: "urgente",
     * //     statusEntrega: "transitando"
     * //   },
     * //   {
     * //     idEntregas: 2,
     * //     idPedido: 6,
     * //     valorDistancia: 200.00,
     * //     valorPeso: 100.00,
     * //     acrescimo: 0.00,
     * //     taxaExtra: 0.00,
     * //     valorFinal: 300.00,
     * //     desconto: 0.00,
     * //     tipoEntrega: "normal",
     * //     statusEntrega: "entregue"
     * //   }
     * // ]
     */
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

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const novaEntrega = await entregaController.adicionarEntregas(req, res);
     * // Saída:
     * {
     * //   message: "Entrega incluida com sucesso!",
     * //   data: {
     * //     idEntregas: 3,
     * //     idPedido: 7,
     * //     valorDistancia: 180.00,
     * //     valorPeso: 90.00,
     * //     acrescimo: 36.00,
     * //     taxaExtra: 15.00,
     * //     valorFinal: 321.00,
     * //     desconto: 0.00,
     * //     tipoEntrega: "urgente",
     * //     statusEntrega: "transitando"
     * //   }
     * }
     */
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

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const entregaDeletada = await entregaController.deletarEntrega(req, res);
     * // Saída:
     * // {
     * //   message: "Entrega excluida com sucesso ",
     * //   data: {
     * //     fieldCount: 0,
     * //     affectedRows: 1,
     * //     insertId: 0,
     * //     info: "",
     * //     serverStatus: 2,
     * //     warningStatus: 0,
     * //     changedRows: 0
     * //   }
     * // }
     */
    // Deletar entrega
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
        }
    }
};

module.exports = { entregaController };