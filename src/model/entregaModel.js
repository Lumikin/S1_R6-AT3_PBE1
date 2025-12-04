const pool = require("../config/db");
const entregaModel = {
    /**
     * 
     * @returns {Promise<*>}
     * 
     * Selecionar todas as entregas
     */
    // Selecionar todas as entregas
    incluirEntregas: async (fkPedido, status) => {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            const [rowsPedido] = await connection.query(
                "SELECT distanciaPedido, valorKm, pesoCarga, valorKg, tipoEntrega FROM pedidos WHERE idPedidos = ?",
                [fkPedido]
            );

            if (rowsPedido.length === 0) {
                throw new Error("Não foi possivel localizar o pedido")
            }

            const pedido = rowsPedido[0];

            const valorDistancia = pedido.valorKm * pedido.distanciaPedido;
            const valorPeso = pedido.valorKg * pedido.pesoCarga;
            const valorBase = valorDistancia + valorPeso;
            const tipoEntrega = pedido.tipoEntrega


            let acrescimo = 0;
            if (tipoEntrega == "urgente") {
                acrescimo = valorBase * 0.2;
            } else {
                acrescimo = 0
            }

            const valorFinalParcial = valorBase + acrescimo;

            let desconto = 0;
            if (valorFinalParcial > 500) {
                desconto = valorFinalParcial * 0.1;
            }

            let taxaExtra = 0;
            if (pedido.pesoCarga > 50) {
                taxaExtra = 15;
            }

            const valorFinal = valorFinalParcial - desconto + taxaExtra;

            const sql =
                "INSERT INTO entregas (idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); ";
            const values = [fkPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, status];
            const [rows] = await connection.query(sql, values);
            await connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    /**
     * 
     * @param {number} fkPedido 
     * @param {string} status
     * @returns {Promise<*>}
     * Incluir nova entrega
     */
    // Incluir nova entrega

    consultarPedido: async (fkPedido) => {
        "SELECT distanciaPedido, valorKm, pesoCarga, valorKg, tipoEntrega FROM pedidos WHERE idPedidos = ?",
            [fkPedido]

    },

    incluirEntregas: async (fkPedido, status) => {
        inserirEntrega: async (fkPedido, status) => {
            // Inserção da nova entrega no banco de dados
            try {
                const sql =
                    "INSERT INTO entregas (idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); ";
                const values = [fkPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, status];
                const [rows] = await connection.query(sql, values);
                await connection.commit();
                connection.release();
                return rows;
            } catch (error) {
                await connection.rollback();
                throw error;
            }
        }

    },

    /**
     * 
     * @param {number} pID
     * @param {string} pStatus
     * @returns {Promise<*>}
     * Atualizar status da entrega
     * /// Atualizar status da entrega
     */
    // Deletar cliente
    deletarEntregas: async (pID) => {
        const sql = 'DELETE FROM entregas WHERE idEntregas = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    },
};
module.exports = { entregaModel };