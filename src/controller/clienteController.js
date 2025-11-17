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
    },
    selecionarId: async (req, res) => {
        try {
            const id = Number(req.params.Id)
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({
                    message: "Forneça um Id valido!"
                })
            }
            const resultado = clienteModel.selecionarUm(id)
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({
                    message: "Registro não encontrado!"
                })
            }
            else {
                return res.status(200).json({
                    message: "Registro encontrado!",
                    data: resultado
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            })
        }
    },
    inserirCliente: async (req, res) => {
        try {
            const { nome, cpf, tel, email, endereco } = req.body;
            if (!nome || nome.length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11 || !tel || tel.length > 13 || tel.length < 8 || !email || !endereco) {
                return res.status(400).json({ message: 'Dados invalidos' })

            }

            const consultarCPF = await clienteModel.verificarCPF(cpf)
            if (consultarCPF.length > 0) {
                return res.status(409).json({ message: "Cpf já esta cadastrado!" })
            }
            const consultarEmail = await clienteModel.verificarEmail(email)
            if (consultarEmail.length > 0) {
                return res.status(409).json({ message: "Email já esta cadastrado!" })
            }
            const resultado = await clienteModel.inserirCliente(nome, cpf, tel, email, endereco)
            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({ message: 'Registro incluido com sucesso', result: resultado })
            } else {
                throw new Error('ocorreu um erro ao incluir o registro')
            }
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


