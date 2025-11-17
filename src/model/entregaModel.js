const pool = require('../config/db');

const entregaModel = {
    selecionarTodos: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql)
        return rows;
    }
}

module.exports = { entregaModel }