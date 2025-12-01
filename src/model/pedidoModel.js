const pool = require('../config/db');
const pedidoModel = {

    /**
     * Insere um novo pedido no banco de dados.
     *
     * @param {number} idClientes - ID do cliente.
     * @param {string} dataPedido - Data do pedido (YYYY-MM-DD).
     * @param {number} distanciaPedido - Distância em quilômetros.
     * @param {number} pesoCarga - Peso da carga em kg.
     * @param {number} valorKm - Valor por km.
     * @param {number} valorKg - Valor por kg.
     *
     * @returns {Promise<Object>} Retorna um objeto contendo `insertId` e `affectedRows`.
     *
     * @example
     * const pedido = await pedidoModel.insertPedido(1, '2024-06-15', 150, 2000, 2.5, 1.8);
     * // Saída:
     * // {
     * //   insertId: 5,
     * //   affectedRows: 1
     * // }
     */
    insertPedido: async (idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega) => {
        const sql = `INSERT INTO pedidos (idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega];

        const [rows] = await pool.query(sql, params);
        return rows
    },

    /**
     * Busca um pedido pelo seu ID.
     *
     * @param {number} idPedidos - ID do pedido a ser buscado.
     *
     * @returns {Promise<Object|null>} Retorna um objeto com os dados do pedido ou null se não existir.
     *
     * @example
     * const pedido = await pedidoModel.buscarPorId(1);
     * // Saída:
     * // {
     * //   idPedidos: 1,
     * //   idClientes: 2,
     * //   dataPedido: "2024-06-10",
     * //   distanciaPedido: 100,
     * //   pesoCarga: 1500,
     * //   valorKm: 2.5,
     * //   valorKg: 1.8
     * // }
     */
    buscarPorId: async (idPedidos) => {
        const sql = 'SELECT * FROM pedidos WHERE idPedidos = ?;';
        const [rows] = await pool.query(sql, [idPedidos]);
        return rows[0] || null;
    },

    /**
     * Exclui um pedido do banco de dados.
     *
     * @param {number} idPedidos - ID do pedido a ser excluído.
     *
     * @returns {Promise<Object>} Retorna o resultado da operação contendo affectedRows.
     *
     * @example
     * const resultado = await pedidoModel.excluirPedido(1);
     * // Saída:
     * // {
     * //   fieldCount: 0,
     * //   affectedRows: 1,
     * //   insertId: 0,
     * //   info: "",
     * //   serverStatus: 2,
     * //   warningStatus: 0,
     * //   changedRows: 0
     * // }
     */
    excluirPedido: async (idPedidos) => {
        const sql = 'DELETE FROM pedidos WHERE idPedidos = ?;';
        const [rows] = await pool.query(sql, [idPedidos]);
        return rows;
    },

    /**
     * Retorna todos os pedidos cadastrados no banco de dados.
     *
     * @returns {Promise<Array>} Lista de todos os pedidos.
     *
     * @example
     * const pedidos = await pedidoModel.selecionarTodosPedidos();
     * // Saída:
     * // [
     * //   {
     * //     idPedidos: 1,
     * //     idClientes: 2,
     * //     dataPedido: "2024-06-10",
     * //     distanciaPedido: 100,
     * //     pesoCarga: 1500,
     * //     valorKm: 2.5,
     * //     valorKg: 1.8
     * //   },
     * //   {
     * //     idPedidos: 2,
     * //     idClientes: 3,
     * //     dataPedido: "2024-06-11",
     * //     distanciaPedido: 200,
     * //     pesoCarga: 2500,
     * //     valorKm: 2.0,
     * //     valorKg: 1.5
     * //   }
     * // ]
     */
    selecionarTodosPedidos: async () => {
        const sql = 'SELECT * FROM pedidos;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Atualiza um pedido existente no banco de dados.
     *
     * @param {number} idPedidos - ID do pedido.
     * @param {number} idClientes - Novo ID do cliente.
     * @param {string} dataPedido - Nova data do pedido (YYYY-MM-DD).
     * @param {number} distanciaPedido - Nova distância em km.
     * @param {number} pesoCarga - Novo peso da carga.
     * @param {number} valorKm - Novo valor por km.
     * @param {number} valorKg - Novo valor por kg.
     *
     * @returns {Promise<Object>} Retorna informações sobre a operação (affectedRows, changedRows...).
     *
     * @example
     * const resultado = await pedidoModel.atualizarPedido(1, 2, '2024-06-15', 150, 2000, 2.5, 1.8);
     * // Saída:
     * // {
     * //   fieldCount: 0,
     * //   affectedRows: 1,
     * //   insertId: 0,
     * //   info: "",
     * //   serverStatus: 2,
     * //   warningStatus: 0,
     * //   changedRows: 1
     * // }
     */
    atualizarPedido: async (idPedidos, idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, tipoEntrega) => {
        const sql = `UPDATE pedidos 
                     SET idClientes = ?, dataPedido = ?, distanciaPedido = ?, pesoCarga = ?, valorKm = ?, valorKg = ?, tipoEntrega = ?
                     WHERE idPedidos = ?;`;

        const values = [idClientes, dataPedido, distanciaPedido, pesoCarga, valorKm, valorKg, idPedidos, tipoEntrega];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * 
     * @returns {Promise<Array>} Lista de todos os tipos de entrega.
     *
     * @example
     * const tipos = await pedidoModel.tipoEntrega();
     * // Saída:
     * // [
     * //   { idTipoEntrega: 1, descricao: "Normal" },
     * //   { idTipoEntrega: 2, descricao: "Expressa" }
     * // ]
     */
    tipoEntrega: async () => {
        const sql = 'SELECT * FROM tipoEntrega;';
        const [rows] = await pool.query(sql);
        return rows;
    }
};

module.exports = { pedidoModel };
