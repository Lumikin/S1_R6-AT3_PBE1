const pool = require("../config/db");
const entregaModel = {
    /**
     * 
     * @returns {Promise<*>}
     * 
     * Selecionar todas as entregas
     */
    // Selecionar todas as entregas
    selecionarTodasEntregas: async () => {
        const sql = "SELECT * FROM entregas;";
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    },

    /**
     * 
     * @param {number} id       
     * @returns {Promise<*>}
     * Selecionar entrega por ID
     * //// Selecionar entrega por ID
     */
    // Selecionar entrega por ID
    selecionarEntrega: async (id) => {
        const sql = "SELECT * FROM entregas WHERE idEntregas = ?"
        const values = [id]
        const [rows] = await pool.query(sql, values)
        return rows;
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
inserirEntrega: async (fkPedido,status) => {
            // Inserção da nova entrega no banco de dados
         try{
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