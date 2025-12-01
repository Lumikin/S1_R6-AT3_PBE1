const pool = require('../config/db');

const clienteModel = {
    // VERIFICADORES:

    /**
     * 
     * @param {string} consultarCPF  
     * @returns 
     * @example
     * const resultado = await clienteModel.verificarCPF('12345678900');
     * // Saída:
     * // [
     * //   {
     * //     idClientes: 1,
     * //     nomeCliente: "João Silva",
     * //     cpfCliente: "12345678900",
     * //     telefoneCliente: "11999999999",
     * //     emailCliente: "
     * //     enderecoCliente: "Rua A, 123"
     * // ]
     */
    // CPF:
    verificarCPF: async (consultarCPF) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente=?;';
        const values = [consultarCPF];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    /**
     * 
     * @param {string} consultarEmail 
     * @returns 
     * @example
     * 
     * const resultado = await clienteModel.verificarEmail('
     * // Saída:
     * // [
     * //   {
     * //     idClientes: 1,
     * //     nomeCliente: "João Silva",
     * //     cpfCliente: "12345678900",
     * //     telefoneCliente: "11999999999",
     * //     emailCliente: "
     * //     enderecoCliente: "Rua A, 123"
     * //   }
     * // ]
     */
    // EMAIL:
    verificarEmail: async (consultarEmail) => {
        const sql = 'SELECT * FROM clientes WHERE emailCliente=?;';
        const values = [consultarEmail];
        const [rows] = await pool.query(sql, values)
        console.log(rows);
        return rows;
    },

    // --------------------------------------------------------------------------------------------- //

    /**
     * 
     * @returns
     * @example
     * const clientes = await clienteModel.selecionarTodos();
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
     *  //     nomeCliente: "Maria Souza",
     * //     cpfCliente: "09876543211",
     * //     telefoneCliente: "11888888888",
     * //     emailCliente: "
     * //     enderecoCliente: "Avenida B, 456"
     * //   }
     * // ] 
     */
    // SELECIONAR:
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    },


    /**
     * 
     * @param {number} pId
     * @returns
     * @example
     * const cliente = await clienteModel.selecionarUm(1);
     * // Saída:
     * // [
     * //   {
     * //     idClientes: 1,
     * //     nomeCliente: "João Silva",
     * //     cpfCliente: "12345678900",
     * //     telefoneCliente: "11999999999",
     * //     emailCliente: "
     * //     enderecoCliente: "Rua A, 123"
     * //   }
     * // ]
     */
    // Selecionar um cliente pelo ID
    selecionarUm: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE idClientes = ?;';
        const values = [pId]
        const [rows] = await pool.query(sql, values)
        return rows;
    },

    /**
     * Insere um novo cliente no banco de dados.
     * @param {string} pNome - Nome do cliente.
     * @param {string} pCpf - CPF do cliente.
     * @param {string} pTel - Telefone do cliente.
     * @param {string} pEmail - Email do cliente.
     * @param {string} pEndereco - Endereço do cliente.
     * @returns {Promise<Object>} Retorna um objeto com os detalhes da inserção.
     * @example
     * const resultado = await clienteModel.inserirCliente('João Silva', '12345678900', '11999999999', '
     *  
        * // Saída:
        * // {
        *  fieldCount: 0,
        *  affectedRows: 1,
        *  insertId: 4,
        * info: "",
        * serverStatus: 2,
        * warningStatus: 0,
        * changedRows: 0
        * }
     */
    //INSERIR:
    inserirCliente: async (pNome, pCpf, pTel, pEmail, pEndereco) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCliente) VALUES (?,?,?,?,?);';
        const values = [pNome, pCpf, pTel, pEmail, pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    /**
     * 
     * @param {number} pID 
     * @returns 
     * @example
     * 
     * const resultado = await clienteModel.deleteCliente(3);
     * // Saída:
     * // {
     * //   fieldCount: 0,
     * //   affectedRows: 1,
     * //   insertId: 0,
     * //   info: "",
     * //   serverStatus: 2,
     * //   warningStatus: 0,
     * //   changedRows: 0
     *  }
     */
    //REMOVER:
    deleteCliente: async (pID) => {
        const sql = 'DELETE FROM clientes WHERE idClientes = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    },

    /**
     * @async 
     * @param {String} pNome 
     * @param {String} pCpf 
     * @param {String} pTel 
     * @param {String} pEmail 
     * @param {String} pEndereco 
     * @param {String} pId 
     * @returns
     * @example
     * const resultado = await clienteModel.alterarCliente('Maria Souza', '09876543211', '11888888888', ', 'Avenida B, 456', 2);
     * // Saída:
     * // { 
     *  fieldCount: 0,
     *  affectedRows: 1,
     *  insertId: 0,
     * info: "",
     * serverStatus: 2,
     * warningStatus: 0,
     * changedRows: 1
     * }
     * 
     *  
     */
    // ATUALIZAR
    alterarCliente: async (pNome, pCpf, pTel, pEmail, pEndereco, pId) => {
        const sql = 'UPDATE clientes SET nomeCliente=?, cpfCliente=?, telefoneCliente=?, emailCliente=?, enderecoCliente=? WHERE idClientes=?;';
        const values = [pNome, pCpf, pTel, pEmail, pEndereco, pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }

}

module.exports = { clienteModel }