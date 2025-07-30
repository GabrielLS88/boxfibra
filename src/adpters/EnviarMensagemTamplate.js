import axios from "axios";
import * as dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

export default async function EnviarMensagemTamplate(dados, nomeTamplate) {
    try {
        const token = process.env.TOKENROTEADOR;
        const flowId = '877f8902-7c82-4ca0-8e99-9e401a404751'; // id do fluxo
        const stateId = idBlock; // id do bloco
        const masterState = `${process.env.IDROTEADOR}@msging.net`; // id do roteador

        const headers = {
            Authorization: token,
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

