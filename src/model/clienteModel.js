const pool = require('../config/db');

const clienteModel = {
    // VERIFICADORES:

    // CPF:
    verificarCPF: async (consultarCPF) => {
        const sql = 'SELECT * FROM clientes WHERE cpfCliente=?;';
        const values = [consultarCPF];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    // EMAIL:

    verificarEmail: async (consultarEmail) => {
        const sql = 'SELECT * FROM clientes WHERE emailCliente=?;';
        const values = [consultarEmail];
        const [rows] = await pool.query(sql, values)
        console.log(rows);
        return rows;
    },

    // --------------------------------------------------------------------------------------------- //

    // SELECIONAR:

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    },
    selecionarUm: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE idClientes = ?;';
        const values = [pId]
        const [rows] = await pool.query(sql, values)
        return rows;
    },

    //INSERIR:

    inserirCliente: async (pNome, pCpf, pTel, pEmail, pEndereco) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCliente) VALUES (?,?,?,?,?);';
        const values = [pNome, pCpf, pTel, pEmail, pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    //REMOVER:
    deleteCliente: async (pID) => {
        const sql = 'DELETE FROM clientes WHERE idClientes = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    },
    alterarCliente: async (pNome, pCpf, pTel, pEmail, pEndereco, pId) => {
        const sql = 'UPDATE clientes SET nomeCliente=?, cpfCliente=?, telefoneCliente=?, emailCliente=?, enderecoCliente=? WHERE idClientes=?;';
        const values = [pNome, pCpf, pTel, pEmail, pEndereco, pId];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    }

}

module.exports = { clienteModel }