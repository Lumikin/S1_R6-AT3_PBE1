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
    }

}

module.exports = { clienteModel }