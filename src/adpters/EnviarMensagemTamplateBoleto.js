import axios from "axios";
import * as dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export default async function EnviarMensagemTamplateBoleto(dados, nomeTamplate, idBlock) {
    try {
        const flowId = '9391e874-166f-47a3-b987-4dc603a0b02b'; // id do fluxo
        const stateId = idBlock; // id do bloco
        const masterState = 'boxfibraativo@msging.net'; // id do roteador

        const headers = {
            Authorization: process.env.TOKENROTEADOR,
            'Content-Type': 'application/json'
        };

        const body = {
            id: generateUUID(),
            to: 'postmaster@activecampaign.msging.net',
            method: 'set',
            uri: '/campaign/full',
            type: 'application/vnd.iris.activecampaign.full-campaign+json',
            resource: {
                campaign: {
                    name: generateUUID(),
                    campaignType: 'Individual',
                    flowId,
                    stateId,
                    masterState,
                },
                audience: {
                    recipient: `+55${dados.phone}`,
                    messageParams: {
                        "1": dados.valor, // valor
                        "2": dados.dataVencimento, // data
                        "3": dados.referente, // referente
                        "4": dados.linkPagamento, // link
                    },
                },
                message: {
                    messageTemplate: nomeTamplate, // nome do tamplate
                    messageParams: [1, 2, 3, 4],
                    channelType: 'WhatsApp',
                },
            },
        };

        const response = await axios.post(
            process.env.URLCOMMAND || `https://${process.env.CONTRACTIDBUSSINES}.http.msging.net/commands`,
            body,
            { headers }
        );

        console.log(response.data)
        return {
            status: true,
            mensagem: "Enviado para a blip com sucesso",
            data: response.data
        }

    } catch (e) {
        return {
            status: false,
            mensagem: "Erro ao enviar a blip",
            data: e
        }
    }
}

function generateUUID() {
    return crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2) + Date.now().toString(36);
}

