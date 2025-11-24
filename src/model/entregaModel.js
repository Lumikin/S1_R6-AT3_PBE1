const pool = require('../config/db');

const entregaModel = {
    adicionarEntrega: async ( idEntregas, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, statusEntrega ) => {

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql =
                `INSERT INTO entregas 
                ( idEntregas, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, statusEntrega)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [ idEntregas, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, statusEntrega];
            const [result] = await connection.query(sql, values);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;

        }
    }
};

module.exports = { entregaModel };
