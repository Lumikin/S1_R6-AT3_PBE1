const pool = require('../config/db');

const clienteModel = {
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql)
        return rows;
    },
    selecionarUm: async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?;';
        const values = [pId]
        const [rows] = await pool.query(sql, values)
        return rows;
    },
    inserirCliente: async (pNome, pCpf, pTel, pEmail, pEndereco) => {
        const sql = 'INSERT INTO clientes (nomeCliente, cpfCliente, telefoneCliente, emailCliente, enderecoCliente) VALUES (?,?,?,?,?);';
        const values = [pNome, pCpf, pTel, pEmail, pEndereco];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
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
    }

}

module.exports = { clienteModel }