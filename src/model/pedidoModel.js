const pool = require('../config/db');

const pedidoModel = {
    insertPedido: async ( pIdEntregas, pIdClientes, pDataPedido, pDistanciaPedido, pPesoCarga, pValorKm, pValorKg ) => {
        const connection = await pool.getConnection();
        try {
        await connection.beginTransaction();
        const valorFinal = calcularEntrega(distanciaPedido, valorKm, pesoCarga, valorKg);

        const sqlPedido = ` INSERT INTO pedidos (idEntregas, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const valuesPedido = [ pIdEntregas, pIdClientes, pDataPedido,pDistanciaPedido, pPesoCarga, pValorKm, pValorKg ];
        const [rowsPedido] = await conn.query(sql, values);

        await connection.commit();
        connection.release();

        return { rowsPedido };

        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    }
};

module.exports = { pedidoModel };
