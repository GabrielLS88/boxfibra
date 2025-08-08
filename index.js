import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
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

let ultimaExecucaoBoletos = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatarData(d) {
    // Ajuste: garantir que seja convertido para -03:00 antes de formatar
    const dLocal = new Date(d.getTime() - 3 * 60 * 60 * 1000);
    return dLocal.toISOString().split("T")[0];
}

function calcularPascoa(ano) {
    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;

    // Ajuste: criar já considerando fuso -03:00
    return new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0) - 3 * 60 * 60 * 1000);
}

function getFeriadosNacionais(ano) {
    const pascoa = calcularPascoa(ano);
    const carnaval = new Date(pascoa.getTime() - 47 * 24 * 60 * 60 * 1000);
    const sextaSanta = new Date(pascoa.getTime() - 2 * 24 * 60 * 60 * 1000);
    const corpusChristi = new Date(pascoa.getTime() + 60 * 24 * 60 * 60 * 1000);

    return [
        new Date(ano, 0, 1),
        new Date(ano, 3, 21),
        new Date(ano, 4, 1),
        new Date(ano, 8, 7),
        new Date(ano, 9, 12),
        new Date(ano, 10, 2),
        new Date(ano, 10, 15),
        new Date(ano, 11, 25),
        carnaval,
        sextaSanta,
        corpusChristi
    ].map(formatarData);
}

function isDiaUtil(date, feriados) {
    // Ajuste: considerar -03:00 na checagem
    const dataLocal = new Date(date.getTime() - 3 * 60 * 60 * 1000);
    const diaSemana = dataLocal.getDay();
    const dataFormatada = formatarData(dataLocal);
    return diaSemana !== 0 && diaSemana !== 6 && !feriados.includes(dataFormatada);
}

function getDiasUteisDoMes(ano, mes, feriados) {
    const diasUteis = [];
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= totalDias; dia++) {
        const data = new Date(ano, mes, dia);
        if (isDiaUtil(data, feriados)) {
            diasUteis.push(formatarData(data));
        }
    }

    return diasUteis;
}

async function iniciarRotatividade() {
    while (true) {
        // Ajuste: garantir -03:00 na referência do agora
        const agora = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

        const ano = agora.getFullYear();
        const mes = agora.getMonth();
        const dataHoje = formatarData(agora);
        const horaAtual = agora.getHours();

        const feriados = getFeriadosNacionais(ano);
        const diasUteis = getDiasUteisDoMes(ano, mes, feriados);

        const primeiroDiaUtil = diasUteis[0];
        const decimoQuintoDiaUtil = diasUteis[14];

        if (horaAtual > -1) {
            console.log("⏳ Executando validações de ordens...");
            try {
                await ValidandoOrdensBrByte();
            } catch (err) {
                console.error("❌ Erro na validações de ordens:", err);
            }
        }

        let deveExecutarBoleto =
            (dataHoje === primeiroDiaUtil || dataHoje === decimoQuintoDiaUtil) &&
            ultimaExecucaoBoletos !== dataHoje;

        console.log(primeiroDiaUtil, decimoQuintoDiaUtil);

        if (deveExecutarBoleto) {
            console.log("📅 Executando validação de boletos para disparos...");
            try {
                await ValidarBoletosParaDiparos();
                ultimaExecucaoBoletos = dataHoje;
            } catch (err) {
                console.error("❌ Erro na validação de boletos:", err);
            }
        }

        console.log("⏳ Aguardando 5 segundos para a próxima execução...");
        await sleep(5000);
    }
}

iniciarRotatividade();