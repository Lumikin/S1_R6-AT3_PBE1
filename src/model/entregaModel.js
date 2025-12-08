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

    /**
     * 
     * @param {string} idPedido 
     * @param {number} valorDistancia 
     * @param {number} valorPeso 
     * @param {number} acrescimo 
     * @param {number} taxaExtra 
     * @param {number} valorFinal 
     * @param {number} desconto 
     * @param {string} tipoEntrega 
     * @param {string} statusEntrega 
     * @returns 
     * @example
     * const novaEntrega = await entregaModel.inserirEntrega(7, 180.00, 90.00, 36.00, 15.00, 321.00,
     * 0.00, "urgente", "transitando");
     * // Saída:
     * // {
     * //   insertId: 3,
     * //   affectedRows: 1
     * // }
     * 
     */
    
    // Incluir nova entrega
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

    /**
     * 
     * @param {number} pID 
     * @param {string} pStatus 
     * @returns 
     * @example
     * const entregaAtualizada = await entregaModel.alterarEntrega(3, "entregue");
     * // Saída:
     * // {
     * //   affectedRows: 1
     * // }
     * 
     */
    // Atualizar status da entrega
    alterarEntrega: async (pID, pStatus) => {
        const sql = 'UPDATE entregas SET statusEntrega = ? WHERE idEntregas = ?;';
        const values = [pStatus, pID];
        const [rows] = await pool.query(sql, values)
        return rows;
    }
};
module.exports = { entregaModel };