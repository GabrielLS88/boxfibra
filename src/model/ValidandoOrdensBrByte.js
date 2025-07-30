import AutenticacaoApi from "../adpters/AutenticacaoApi.js";
import ColetarOrdens from "../adpters/ColetarOrdens.js";
import ColetarCliente from "../adpters/ColetarCliente.js";
import EnviarMensagemTamplate from "../adpters/EnviarMensagemTamplate.js";

export default async function ValidandoOrdensBrByte() {
    try {
        const autenticacao = await AutenticacaoApi();

        if (autenticacao.status === false) {
            return {
                status: false,
                mensagem: "Erro ao autenticar login para requisições",
                data: autenticacao.data
            }
        }

        const coletandoOrdensAtivas = await ColetarOrdens();

        if (coletandoOrdensAtivas.status === false) {
            return {
                status: false,
                mensagem: "Erro ao coletar ordens....",
                data: autenticacao.data
            }
        }

        if (coletandoOrdensAtivas.data.results.length === 0) {
            return {
                status: true,
                mensagem: "Não foi encontrado nenhuma ordem para validar....",
                data: autenticacao.data
            }
        }

        const listaOrdes = coletandoOrdensAtivas.data.results;

        console.log(`🔷 Foram encontrados ${listaOrdes.length} clientes`);

        for (let i = 0; i < listaOrdes.length; i++) {
            const consultaClienteResponse = await ColetarCliente(listaOrdes[i].client_pk);

            if (consultaClienteResponse.status === false) {
                console.log(consultaClienteResponse.mensagem);
                continue;
            }

            if (consultaClienteResponse.data.results.length === 0) {
                console.log(`🔴 Nenhum cliente encontrado com o id ${listaOrdes[i].client_pk}`);
                continue;
            }

            const dadosCliente = consultaClienteResponse.data.results[0];

            const timeFormatado = formatarDataEHoraBR(listaOrdes[i].op_date_sched);
            const dadosInfo = {
                "nome": dadosCliente.client_name,
                "endereco": listaOrdes[i].address + " - " + listaOrdes[i].address_number + " - " + listaOrdes[i].address_neighborhood + " - " + listaOrdes[i].address_province + " " + listaOrdes[i].address_state,
                "dataPrevista": timeFormatado.dataFormatada,
                "horaPrevista": timeFormatado.horaFormatada,
                "phone": dadosCliente.phone_number,
                "task": listaOrdes[i].task_name
            }

            console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
            await EnviarMensagemTamplate(dadosInfo, "tamplate_teste");
        }

        return {
            status: coletandoOrdensAtivas.status,
            mensagem: coletandoOrdensAtivas.mensagem,
            data: coletandoOrdensAtivas.data
        }

    } catch (e) {
        return {
            status: false,
            mensagem: "Erro ao validar ordens",
            data: e
        }
    }
}


function formatarDataEHoraBR(dataStringUTC3) {
    const [dataPart, horaPart] = dataStringUTC3.split(' ');
    const [ano, mes, dia] = dataPart.split('-').map(Number);
    const [hora, minuto, segundo] = horaPart.split(':').map(Number);
    const data = new Date(Date.UTC(ano, mes - 1, dia, hora + 3, minuto, segundo));
    const diaFormatado = String(data.getUTCDate()).padStart(2, '0');
    const mesFormatado = String(data.getUTCMonth() + 1).padStart(2, '0');
    const anoFormatado = data.getUTCFullYear();
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');

    return {
        dataFormatada: `${diaFormatado}/${mesFormatado}/${anoFormatado}`,
        horaFormatada: `${horas}:${minutos}`
    };
}


// PORTA=4011
// TOKEN="Sq6HwAhjAnyGgBS6fgtDRIFvFxYxZ57nPxrh83t5XIRrKysmP6CcEFPxRUtTDgBm"
// USUARIO="blip"
// SENHA="blip"
// URL="http://controllr.boxtele.com.br:8081"
// TOKENROTEADOR=""
// IDROTEADOR=""
// CONTRACTIDBUSSINES="Telek"