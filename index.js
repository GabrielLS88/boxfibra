import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Oauth } from './src/controller/Oauth.js';
import ValidandoOrdensBrByte from './src/model/ValidandoOrdensBrByte.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORTA = process.env.PORTA;

app.get('/', Oauth,)

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})

async function iniciarRotatividade() {
    while (true) {
        const agora = new Date();
        const horaAtual = agora.getHours();
        if (horaAtual > -1) { //horaAtual >= 7 && horaAtual < 23
            console.log("⏳ Executando validações de ordens...");
            try {
                const startValdiation = await ValidandoOrdensBrByte();
                //console.log(startValdiation.data)

            } catch (err) {
                console.error("❌ Erro na validações de ordens:", err);
            }
        } else {
            console.log("🕒 Fora do horário permitido (07:00 - 18:00). Aguardando...");
        }
        console.log("⏳ Aguardando 5 segundos para a próxima execução...");
        await sleep(5 * 1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

iniciarRotatividade();