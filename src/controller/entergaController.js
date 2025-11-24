const { entregaModel } = require('../model/entregaModel');
const entregaController = {
    listarEntregas: async (req, res) => {
        try {
            const resultado = await entregaModel.selecionarTodasEntregas();
            if (!resultado || resultado.length === 0) {
                return res.status(400).json({ message: 'A tabela Clientes não contém registros' })
            }
            res.status(200).json({ message: 'Resultado dos dados listados:', data: resultado })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    },
    adicionarEntregas: async (req, res) => {
        try {
            const { Pedido, Distancia, Peso, Tipo, Status } = req.body;

            // validações bem simples
            if (!Pedido || !Distancia || !Peso || !Tipo || !Status) {
                return res.status(400).json({ message: 'Dados inválidos.' });
            }
            if (Distancia < 0 || Peso < 0) {
                return res.status(400).json({ message: 'Distância e peso não podem ser negativos.' });
            }
            if (Tipo !== 'normal' && Tipo !== 'urgente') {
                return res.status(400).json({ message: 'Tipo deve ser "normal" ou "urgente".' });
            }

            // pega preços do pedido
            const precoKm = await entregaModel.consultarPrecoKM(Pedido);
            const precoKg = await entregaModel.consultarPrecoKG(Pedido);

            if (precoKm == null || precoKg == null) {
                return res.status(400).json({ message: 'Não foi possível consultar preços do pedido.' });
            }
            const valorDistancia = precoKm * Distancia;
            const valorPeso = precoKg * Peso;
            let valorBase = valorDistancia + valorPeso;

            let acrescimo = 0;
            if (Tipo === 'urgente') {
                acrescimo = valorBase * 0.2;
            }

            let valorFinal = valorBase + acrescimo;

            let desconto = 0;
            if (valorFinal > 500) {
                desconto = valorFinal * 0.1;
                valorFinal = valorFinal - desconto;
            }

            let taxaExtra = 0;
            if (Peso > 50) {
                taxaExtra = 15;
                valorFinal = valorFinal + taxaExtra;
            }

            const result = await entregaModel.inserirEntrega(
                Pedido, valorDistancia, valorPeso, acrescimo, taxaExtra, valorFinal, desconto, Tipo, Status
            );

            if (result.affectedRows === 1) {
                return res.status(201).json({ message: 'Entrega cadastrada com sucesso.', id: result.insertId });
            }

            return res.status(500).json({ message: 'Erro ao salvar a entrega.' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro no servidor.' });
        }
    }
}


module.exports = { entregaController }