// ...existing code...
const pool = require('../config/db');

const pedidoModel = {
    insertPedido: async (idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg) => {
        try {
            let sql, params;
            sql = ` INSERT INTO pedidos (idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg) VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
            params = [idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg];


            const [result] = await pool.query(sql, params);
            return { insertId: result.insertId, affectedRows: result.affectedRows };
        } catch (err) {
            console.error('Erro ao inserir pedido:', err);
            throw new Error('Erro ao inserir pedido: ' + (err.message || err));
        }
    }
};

module.exports = { pedidoModel };
