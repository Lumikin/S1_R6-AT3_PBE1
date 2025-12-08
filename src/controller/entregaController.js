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
            const idPedido = Number(req.params.idPedido)
            // Verificar se idPedido é valido
            if (!idPedido || isNaN(idPedido)) {
                return res.status(400).json({
                    message: "Insira um ID Valido!!"
                })
            }

            //Consultar os dados
            const dadosPedidos = await entregaModel.buscarPedido(idPedido)

            //Verificar se os dados estão inseridos!
            if (!dadosPedidos || dadosPedidos.length === 0) {
                return res.status(404).json({ message: "Pedido não encontrado." });
            }

            const pedido = dadosPedidos[0]

            const distancia = pedido.distanciaPedido
            const peso = pedido.pesoCarga
            const vKM = pedido.valorKm
            const vKG = pedido.valorKg
            const tipo = pedido.tipoEntrega

            if (!distancia || !peso || !vKM || !vKG || !tipo) {
                return res.status(400).json({
                    message: "Os dados do pedido não foram encontrados"
                })
            }

            const valorDistancia = distancia * vKM;
            const valorPeso = peso * vKG;
            const valorBase = valorDistancia + valorPeso;

            let acrescimo = 0
            if (tipo === "urgente") {
                acrescimo = valorBase * 0.20 //20%
            }
            let taxaExtra = 0
            if (peso > 50) {
                taxaExtra = 15, 0
            }

            let subTotal = acrescimo + taxaExtra + valorBase

            let desconto = 0
            if (subTotal > 500) {
                desconto = subTotal * 0.10;
            }
            const valorFinal = subTotal - desconto + taxaExtra
            const { status } = req.body
            if (status !== "calculado" && status !== "transito" && status !== "entregue" && status !== "cancelado") {
                return res.status(400).json({
                    message: "por favor insira um status valido: calculado, transito, entregue, cancelado"
                })
            }

            const resultado = await entregaModel.inserirEntrega(idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipo, status)

            return res.status(200).json({
                message: "A entrega foi incluida com sucesso!",
                data: resultado
            })

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

            if (error == (1451)) {
                return res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
            }
        }
    },

    /**
     * 
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const entregaAlterada = await entregaController.alterarEntrega(req, res);
     * // Saída:
     * // {
     * //   message: "Entrega atualizada com sucesso ",
     * //   data: {
     * //     fieldCount: 0,
     * //     affectedRows: 1,
     * //     insertId: 0,
     * //     info: "",
     * //     serverStatus: 2,
     * //     warningStatus: 0,
     * //     changedRows: 1
     * //   }
     * // }
     */
    // atualiza uma entrega pelo ID
    alterarEntrega: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;    
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" });
            }
            // Validação do status
            if (status !== "entregue" && status !== "transitando" && status !== "cancelado") {
                return res.status(400).json({ message: "Verifique se os status de entrega estao digitados: entregue, transitando ou cancelado", });
            }
            // Verifica se a entrega existe
            const consulta = await entregaModel.selecionarEntrega(id);
            if (consulta.length === 0) {
                throw new Error("Registro não localizado");
            } else {
                // Realiza a atualização
                const resultado = await entregaModel.atualizarEntregas(id, status); 
                if (resultado.affectedRows === 1) {
                    res.status(201).json({ message: "Entrega atualizada com sucesso ", data: resultado });
                } else {
                    throw new Error("Não foi possivel atualizar a Entrega");
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message } );
            if (error == (1451)) {
                return res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message });
            }   
        }
     }
};

module.exports = { entregaController };