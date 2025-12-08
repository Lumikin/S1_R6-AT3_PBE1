const pool = require("../config/db");
const entregaModel = {
    /**
     * 
     * @returns {Promise<*>}
     * 
     * Selecionar todas as entregas
     */
    selecionarTodasEntregas: async () => {
        const sql = "SELECT * FROM entregas"
        const [rows] = await pool.query(sql);
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

    buscarPedido: async (idPedido) => {
        const sql = `SELECT distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega FROM Pedidos WHERE idPedidos = ?;`;
        const values = [idPedido];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    inserirEntrega: async (idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega) => {
        const sql = `INSERT INTO Entregas (idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const values = [idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega];
        const [rows] = await pool.query(sql, values);
        return rows;
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

    
    alterarEntrega: async (pID, pStatus) => {
        const sql = 'UPDATE entregas SET statusEntrega = ? WHERE idEntregas = ?;';
        const values = [pStatus, pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    }
};
module.exports = { entregaModel };