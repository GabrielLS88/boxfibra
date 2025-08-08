import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import { Oauth } from './src/controller/Oauth.js';
import ValidandoOrdensBrByte from './src/model/ValidandoOrdensBrByte.js';
import ValidarBoletosParaDiparos from './src/model/ValidarBoletosParaDiparos.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORTA = process.env.PORTA;

app.get('/', Oauth);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});


cron.schedule('0 6 * * *', async () => {
    console.log('⏰ Iniciando execuções às 06:00');

    try {
        console.log('▶️ Executando ValidandoOrdensBrByte...');
        await ValidandoOrdensBrByte();
        console.log('✅ ValidandoOrdensBrByte finalizado.');
    } catch (err) {
        console.error('❌ Erro em ValidandoOrdensBrByte:', err);
    }

    try {
        console.log('▶️ Executando ValidarBoletosParaDiparos...');
        await ValidarBoletosParaDiparos();
        console.log('✅ ValidarBoletosParaDiparos finalizado.');
    } catch (err) {
        console.error('❌ Erro em ValidarBoletosParaDiparos:', err);
    }

    console.log('🏁 Todas as execuções das 06:00 finalizadas.');
}, {
    timezone: "America/Sao_Paulo"
});

ValidarBoletosParaDiparos();