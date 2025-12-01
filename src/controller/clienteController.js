const { clienteModel } = require('../model/clienteModel');
const clienteController = {

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
    // SELECIONAR CLIENTE POR ID:
    selecionarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente)
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
<<<<<<< HEAD
            // CONSULTAR CLIENTE
            const resultado = clienteModel.selecionarUm(id)
            // Verificar se há registros na tabela
=======
            const resultado = clienteModel.selecionarCliente(id)
>>>>>>> 61530bcf2a733b9fd628b45855b07dc4b0e6dc43
            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: "Registro não encontrado!" })
            }

            return res.status(200).json({ message: "Registro encontrado!", data: resultado })

        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    // ADICIONAR UM CLIENTE:
    inserirCliente: async (req, res) => {
        try {
            const { nome, cpf, tel, email, endereco } = req.body;
            if (!nome || nome.length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11 || !tel || tel.length > 13 || tel.length < 8 || !email || !endereco) {
                return res.status(400).json({ message: 'Dados invalidos' }) //^== VERIFICAR SE TODAS AS VARIAVEIS SÃO VALIDAS EM SEUS ELEMENTOS 

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
            const resultado = await clienteModel.inserirCliente(nome, cpf, tel, email, endereco)
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

    // ALTERAR CLIENTE:
    alterarCliente: async (req, res) => {
        try {
            const id = Number(req.params.idCliente)
            let { nome, cpf, email, tel, endereco } = req.body
            nome = nome.trim();
            // VALIDAÇÕES DOS DADOS
            if (!nome || nome.trim().length < 3 || !String(nome) || !Number(cpf) || cpf.length != 11 || !tel || tel.length > 13 || tel.length < 8 || !email || !endereco) {
                return res.status(400).json({ message: "Verifique os dados enviados e tente novamente!" });
            }
<<<<<<< HEAD
            // Verificar se o cliente existe
            const ClienteAtual = await clienteModel.selecionarUm(id)
=======
            const ClienteAtual = await clienteModel.selecionarCliente(id)
>>>>>>> 61530bcf2a733b9fd628b45855b07dc4b0e6dc43
            if (!ClienteAtual || ClienteAtual.length === 0) {
                throw new Error("Registro não localizado");
            }
            const novoNome = nome.trim() ?? ClienteAtual[0].nomeCliente;
            const novoCpf = cpf ?? ClienteAtual[0].cpfCliente;
            const novoEmail = email ?? ClienteAtual[0].emailCliente;
            const novoTel = tel ?? ClienteAtual[0].telefoneCliente;
            const novoEndereco = endereco ?? ClienteAtual[0].enderecoCliente;
            console.log(cpf, nome)
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
            const resultado = await clienteModel.alterarCliente(novoNome, novoCpf, novoTel, novoEmail, novoEndereco, id);
            if (resultado.changedRows === 0) {
                throw new Error("Ocorreu um erro ao atualizar o produto");

            }

            return res.status(200).json({ message: "Registro atualizado com sucesso", data: resultado })
        } catch (error) {
            console.error(error)
            res.status(500).json({ Message: 'Ocorreu um erro no servidor.', errorMessage: error.message })
        }
    },

    // REMOVER CLIENTE:
    removerCliente: async (req, res) => {
        try {
            const id = Number(req.params.id)
            // VALIDAÇÃO DO ID
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "Forneça um ID valido!" })
            }
            const consulta = await clienteModel.selecionarCliente(id);
            if (consulta.length === 0) {
                throw new Error("Registro não localizado");

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


