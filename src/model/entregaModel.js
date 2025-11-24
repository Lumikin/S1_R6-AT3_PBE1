const pool = require('../config/db');
const entregaModel = {
    selecionarTodasEntregas: async () => {
        const sql = 'SELECT * FROM entregas;';
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    },
    inserirEntrega: async (pValorDistancia, pValorPeso, pAcrescimo, pTaxa, pValorFinal, pDesconto, pTipo, pStatus) => {
        const sql = 'INSERT INTO clientes (valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, tipoEntrega, statusEntrega  ) VALUES (?,?,?,?,?,?,?,?);';
        const values = [pValorDistancia, pValorPeso, pAcrescimo, pTaxa, pValorFinal, pDesconto, pTipo, pStatus];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
}


module.exports = { entregaModel }