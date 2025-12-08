const { clienteModel } = require("../model/clienteModel");
const { pedidoModel } = require("../model/pedidoModel");
const clienteController = {

    /**
         * 
         * @param {Request} req   
         * @param {Response} res
         * @returns
         * @example
         * const clientes = await clienteController.selecionarTodos(req, res);
         * // Saída:
         * // [
         * //   {
         * //     idClientes: 1,
         * //     nomeCliente: "João Silva",
         * //     cpfCliente: "12345678900",
         * //     telefoneCliente: "11999999999",
         * //     emailCliente: "
         * //     enderecoCliente: "Rua A, 123"
         * //   },
         * //   {
         * //     idClientes: 2,
         * //     nomeCliente: "Maria Souza",
         * //     cpfCliente: "09876543211",
         * //     telefoneCliente: "21988888888",
         * //     emailCliente: "
         * //     enderecoCliente: "Avenida B, 456"
         * //   }
         * // ] 
         */
    // SELECIONAR TODOS OS CLIENTES:
    selecionarTodos: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarTodos();
            // Verificar se há registros na tabela
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({ message: 'A tabela Clientes não contém registros' })
            }
            res.status(200).json({ message: 'Resultado dos dados listados:', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const cliente = await clienteController.selecionarCliente(req, res);
     * // Saída:
     * // {
     * //   idClientes: 1,
     * //   nomeCliente: "João Silva",
     * //   cpfCliente: "12345678900",
     * //   telefoneCliente: "11999999999",
     * //   emailCliente: "
     * //   enderecoCliente: "Rua A, 123"
     * 
     * 
     * 
     */

    // SELECIONAR CLIENTE POR ID:
    selecionarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente)
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
            // CONSULTAR CLIENTE
            const resultado = clienteModel.selecionarUm(id)
            // Verificar se há registros na tabela

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: "Registro não encontrado!" })
            }

            return res.status(200).json({ message: "Registro encontrado!", data: resultado })

        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const novoCliente = await clienteController.inserirCliente(req, res);
     * // Saída:
     * // {
     * //   message: 'Registro incluido com sucesso',
     * //   data: {
     * //     affectedRows: 1,
     * //     insertId: 3
     * //   }
     * }
     * 
     */
    // ADICIONAR UM CLIENTE:
    inserirCliente: async (req, res) => {
        try {
            const { nome, cpf, email, tel, logradouro, numero, bairro, estado, CEP } = req.body;
            if (!nome || nome.trim().length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11 || !tel || tel.length > 13 || tel.length < 8 || !email || !logradouro || !numero || isNaN(numero) || numero < 3 || !bairro || bairro.length < 3 || !estado || estado.length < 3 || !CEP || isNaN(CEP) || CEP.length != 8) {
                return res.status(400).json({ message: "Verifique os dados enviados e tente novamente!" });
            }
            // CONSULTAR CPF:
            const consultarCPF = await clienteModel.verificarCPF(cpf)
            if (consultarCPF.length > 0) {
                return res.status(409).json({ message: "Cpf já esta cadastrado!" })
            }
            // CONSULTAR EMAIL
            const consultarEmail = await clienteModel.verificarEmail(email)
            if (consultarEmail.length > 0) {
                return res.status(409).json({ message: "Email já esta cadastrado!" })
            }
            // INSERIR CLIENTE
            const resultado = await clienteModel.inserirCliente(nome, cpf, email, tel, logradouro, numero, bairro, estado, CEP)
            if (resultado.affectedRows === 1 && resultado.insertId !== 0) {
                res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado })
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
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const clienteAtualizado = await clienteController.alterarCliente(req, res);
     * // Saída:
     * // {
     * //   message: 'Registro atualizado com sucesso',
     * //   data: {
     * //     fieldCount: 0,
     * //     affectedRows: 1,
     * //     insertId: 0,
     * //     info: "",
     * //     serverStatus: 2,
     * //     warningStatus: 0,
     * //     changedRows: 1
     *  
     * 
     * 
     */
    // ALTERAR CLIENTE:
    alterarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente)
            let { nome, cpf, email, tel, logradouro, numero, bairro, estado, CEP } = req.body
            nome = nome.trim();
            if (!nome || nome.trim().length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11 || !tel || tel.length > 13 || tel.length < 8 || !email || !logradouro || !numero || isNaN(numero) || numero < 3 || !bairro || bairro.length < 3 || !estado || estado.length < 3 || !CEP || isNaN(CEP) || CEP.length != 8) {
                return res.status(400).json({ message: "Verifique os dados enviados e tente novamente!" });
            }
            // Verificar se o cliente existe
            const ClienteAtual = await clienteModel.selecionarUm(id)
            if (!ClienteAtual || ClienteAtual.length === 0) {
                throw new Error("Registro não localizado");
            }
            const novoNome = nome.trim() ?? ClienteAtual[0].nomeCliente;
            const novoCpf = cpf ?? ClienteAtual[0].cpfCliente;
            const novoEmail = email ?? ClienteAtual[0].emailCliente;
            const novoTel = tel ?? ClienteAtual[0].telefoneCliente;
            const novoLogradouro = logradouro ?? ClienteAtual[0].logradouro;
            const novonumero = numero ?? ClienteAtual[0].numero;
            const novoBairro = bairro ?? ClienteAtual[0].bairro;
            const novoEstado = estado ?? ClienteAtual[0].estado;
            const novoCEP = CEP ?? ClienteAtual[0].CEP;
            const consultarCPF = await clienteModel.verificarCPF(novoCpf)
            if (consultarCPF.length > 0) {
                return res.status(409).json({ message: "Cpf já esta cadastrado!" })

            }
            // CONSULTAR EMAIL
            const consultarEmail = await clienteModel.verificarEmail(novoEmail)
            if (consultarEmail.length > 0) {
                return res.status(409).json({ message: "email já esta cadastrado!" })

            }
            // Realizar a atualização
            const resultado = await clienteModel.alterarCliente(novoNome, novoTel, novoCpf, novoEmail, novoLogradouro, novonumero, novoBairro, novoEstado, novoCEP, id);
            if (resultado.changedRows === 0) {
                throw new Error("Ocorreu um erro ao atualizar o produto");

            }

            return res.status(200).json({ message: "Registro atualizado com sucesso", data: resultado })
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     * @example
     * const clienteRemovido = await clienteController.removerCliente(req, res);
     * // Saída:
     * // {
     * //   message: 'Cliente excluido com sucesso ',
     * //   data: {
     * //     affectedRows: 1,
     * //     insertId: 0,
     * //     info: "",
     * //     serverStatus: 2,
     * //     warningStatus: 0,
     * //     changedRows: 0
     *  }
     * 
     */
    // REMOVER CLIENTE:
    removerCliente: async (req, res) => {
        try {
            const id = Number(req.params.id)
            // VALIDAÇÃO DO ID
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
            const consultaPedido = await pedidoModel.buscarClienteporPedido(id)

            const consulta = await clienteModel.selecionarUm(id);
            if (consulta.length === 0) {
                return res.status(400).json({ message: "Registro não foi localizado!" });
            }
            else {
                // REALIZA A EXCLUSÃO
                const resultado = await clienteModel.deleteCliente(id);


                if (resultado.affectedRows === 1) {
                    res.status(201).json({ message: "Cliente excluido com sucesso ", data: resultado })
                }
                else {
                    throw new Error("Não foi possivel excluir o Cliente");

                }
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    }
}
module.exports = { clienteController }