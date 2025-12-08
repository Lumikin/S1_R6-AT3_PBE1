const calculo = {

    /**
     * 
     * @param {Number} idPedido 
     * id do pedido que será chamado
     * @returns 
     */
    calcularEntrega: async (idPedido) => {
        // Verificar se idPedido é valido
        if (!idPedido || isNaN(idPedido)) {
            return res.status(400).json({
                message: "Insira um ID Valido!!"
            })
        }

        //Consultar os dados
        const dadosPedidos = await entregaModel.buscarPedido(idPedido)

        //Verificar se os dados estão inseridos!
        if (!dadosPedidos || dadosPedidos.length === 0) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        const pedido = dadosPedidos[0]

        const distancia = pedido.distanciaPedido
        const peso = pedido.pesoCarga
        const vKM = pedido.valorKm
        const vKG = pedido.valorKg
        const tipo = pedido.tipoEntrega

        if (!distancia || !peso || !vKM || !vKG || !tipo) {
            return res.status(400).json({
                message: "Os dados do pedido não foram encontrados"
            })
        }

        const valorDistancia = distancia * vKM;
        const valorPeso = peso * vKG;
        const valorBase = valorDistancia + valorPeso;

        let acrescimo = 0
        if (tipo === "urgente") {
            acrescimo = valorBase * 0.20 //20%
        }
        let taxaExtra = 0
        if (peso > 50) {
            taxaExtra = 15, 0
        }

        let subTotal = acrescimo + taxaExtra + valorBase

        let desconto = 0
        if (subTotal > 500) {
            desconto = subTotal * 0.10;
        }
        const valorFinal = subTotal - desconto + taxaExtra
        return valorFinal
    }

}

module.exports = { calculo }
