const { entregaModel } = require('../model/entregaModel');
const entregaController = {
    listarEntregas: async (req, res) => {
        try {
            const resultado = await entregaModel.selecionarTodasEntregas();
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({ message: 'A tabela Clientes não contém registros' })
            }
            res.status(200).json({ message: 'Resultado dos dados listados:', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    adicionarEntregas: async (req, res) => {
        try {
            const { Pedido, Distancia, Peso, Acrescimo, Taxa, Desconto, Tipo, Status } = req.body;
            if (!Distancia || !Peso || !Acrescimo || !Taxa || !Desconto || !Tipo || !Status || tipoEntrega === "normal" || tipoEntrega === "urgente" || valorDistancia < 0 || valorPeso < 0) {
                return res.status(400).json({ message: 'Dados invalidos' })
            }
            const resultado = await entregaModel.inserirEntrega(valorDistancia, valorPeso, acrescimo, taxaExtra, desconto, tipoEntrega, statusEntrega)
            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({ message: 'Registro incluido com sucesso', result: resultado })
            } else {
                throw new Error('ocorreu um erro ao incluir o registro')
            }
            const ValorFinal = {} 
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    }
}


module.exports = { entregaController }