const pool = require('../config/db');
const entregaModel = {
    selecionarTodasEntregas: async () => {
        const sql = 'SELECT * FROM entregas;';
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    },
    inserirEntrega: async (pPedido, pDistancia, pPeso, pAcrescimo, pTaxa, pValorFinal, pDesconto, pTipo, pStatus) => {
        const sql = 'INSERT INTO clientes (idPedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega  ) VALUES (?,?,?,?,?,?,?,?);';
        const values = [pPedido, pDistancia, pPeso, pAcrescimo, pTaxa, pValorFinal, pDesconto, pTipo, pStatus];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },

    //CONSULTA:
    consultarPrecoKG: async (pId) => {
        const sql = "SELECT valorKg FROM pedidos WHERE idPedidos = ?;";
        const values = [pId]
        const [rows] = await pool.query(sql, pId);
        return rows;
    },

    consultarPrecoKM: async () => {
        const sql = "SELECT valorKm FROM pedidos WHERE idPedidos = ?;";
        const [rows] = await pool.query(sql);
        return rows;
    },
}



module.exports = { entregaModel }