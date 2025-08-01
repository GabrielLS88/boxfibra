import axios from "axios";
import * as dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export default async function EnviarMensagemTamplate(dados, nomeTamplate, idBlock) {
    try {
        const flowId = 'd5b2a311-88b3-4e97-88fa-7f604bd12ae3'; // id do fluxo
        const stateId = idBlock; // id do bloco
        const masterState = 'roteadortelek1@msging.net'; // id do roteador

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
                        "1": dados.nome,
                        "2": dados.dataPrevista,
                        "3": dados.horaPrevista,
                        "4": dados.endereco,
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

