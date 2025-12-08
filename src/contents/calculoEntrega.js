const { entregaModel } = require('../model/entregaModel');
const calculo = {
    calcularValorEntrega: async (pedido) => {
        {
            const pedidoData = await entregaModel.buscarPedido(pedido);
            const pedidoInfo = pedidoData[0];

            const distancia = pedidoInfo.distanciaPedido;
            const peso = pedidoInfo.pesoCarga;
            const vKM = pedidoInfo.valorKm;
            const vKG = pedidoInfo.valorKg;
            const tipo = pedidoInfo.tipoEntrega;

            // Validação simples
            if (!distancia || !peso || !vKM || !vKG || !tipo) {
                throw Error("Dados do pedido incompletos para cálculo da entrega.");
            }

            // ---- Cálculos base ----
            const valorDistancia = distancia * vKM;
            const valorPeso = peso * vKG;
            const valorBase = valorDistancia + valorPeso;

            // ---- Acréscimos ----
            let acrescimo = 0;
            if (tipo === "urgente") {
                acrescimo = valorBase * 0.20; // 20%
            }

            let taxaExtra = 0;
            if (peso > 50) {
                taxaExtra = 15;  // <-- você tinha "15, 0" (isso é errado em JS)
            }

            // ---- Subtotal ----
            let subTotal = valorBase + acrescimo + taxaExtra;

            // ---- Desconto ----
            let desconto = 0;
            if (subTotal > 500) {
                desconto = subTotal * 0.10; // 10%
            }

            // ---- Valor final ----
            const valorFinal = subTotal - desconto;
            console.log("calculado com sucesso")
            console.log(valorDistancia,
                valorPeso,
                valorBase,
                acrescimo,
                taxaExtra,
                subTotal,
                desconto,
                valorFinal)
            return {
                valorDistancia,
                valorPeso,
                valorBase,
                acrescimo,
                taxaExtra,
                subTotal,
                desconto,
                tipo,
                valorFinal
            };

        }
    }
}
module.exports = { calculo };