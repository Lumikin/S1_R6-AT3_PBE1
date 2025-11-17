const { clienteModel } = require('../model/clienteModel');
const clienteController = {
    selecionarTodosClientes: async (req, res) => {
        try {
            const resultado = clienteModel.selecionarTodos();
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({ message: 'A tabela Clientes não contém registros' })
            }
            res.status(200).json({
                message: 'Resultado dos dados listados:',
                data: resultado
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    }
}
module.exports = { clienteController }