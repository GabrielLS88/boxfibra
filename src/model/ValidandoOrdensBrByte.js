import AutenticacaoApi from "../adpters/AutenticacaoApi.js";
import ColetarSuportes from "../adpters/ColetarSuportes.js";
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

        const coletandoOrdensAtivas = await ColetarSuportes();

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

        //const listaOrdes = coletandoOrdensAtivas.data.results;
        const listaOrdes = [
            {
                "ticket_pk": 6415,
                "ticket_protocol": "202507180000000",
                "ticket_phone": null,
                "ticket_title": "Ativacao Internet",
                "ticket_desc": "Cliente solicitou ativação de serviço de internet via whatsapp 33)99815-8905",
                "ticket_obs": "",
                "ticket_date_create": "2025-07-18 08:02:20",
                "ticket_date_last": "2025-08-06 20:47:31",
                "ticket_date_close": null,
                "ticket_status": 4,
                "ticket_deleted": false,
                "ticket_create_type": 1,
                "ticket_priority": 3,
                "ticket_type": 0,
                "ticket_sla": 2880,
                "ticket_amount": "0.0",
                "ticket_notify": 0,
                "ticket_client_show": 1,
                "ticket_client_active": true,
                "ticket_client_view": false,
                "ticket_client_date": "2025-07-18 08:02:20",
                "ticket_done": 0,
                "staff_pk": null,
                "user_pk": 26,
                "category_pk": 4,
                "client_pk": 2675,
                "contract_pk": 3197,
                "topic_pk": null,
                "category_pk": 4,
                "category_name": "Ativacao Internet",
                "category_color": "#5BFF00",
                "topic_pk": null,
                "topic_title": null,
                "topic_color": null,
                "client_status": 0,
                "client_complete_name": "MARCELO DE PAULA FARIA",
                "client_name": "MARCELO",
                "client_lastname": "DE PAULA FARIA",
                "client_username": "12239460610",
                "client_type": 0,
                "client_doc1": "12239460610",
                "client_doc2": "MG 22.042.670 ",
                "contract_number": 2506,
                "address_pk": 2599,
                "inv_unpaid": null,
                "user_username": "aguia@boxfibra.com.br",
                "user_name": "Aguia",
                "time_open": "1699912.480265",
                "sla_expired": true
            }
        ]

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
            const verificarSeEstaDentroDasCondicoes = verificarHorasRestantes(listaOrdes[i].op_date_sched)
            const timeFormatado = formatarDataEHoraBR(listaOrdes[i].op_date_sched);

            console.log(verificarSeEstaDentroDasCondicoes)

            if (verificarSeEstaDentroDasCondicoes === false) {
                console.log(`💜 Cliente não deve ser notificado pois a data não esta dentro da validação: ${dadosCliente.client_name} - PK ${listaOrdes[i].client_pk}`);
                continue;
            }

            // const dadosInfo = {
            //     "nome": dadosCliente.client_name,
            //     "endereco": dadosCliente.cli_addr_address + " - " + dadosCliente.cli_addr_number + " - " + dadosCliente.cli_addr_neighborhood + " - " + dadosCliente.cli_addr_province + " " + dadosCliente.cli_addr_state,
            //     "dataPrevista": timeFormatado.dataFormatada,
            //     "horaPrevista": timeFormatado.horaFormatada,
            //     "phone": dadosCliente.phone_number,
            //     "task": listaOrdes[i].task_name
            // }

            const dadosInfo = {
                "nome": "Gabriel telek",
                "endereco": dadosCliente.cli_addr_address + " - " + dadosCliente.cli_addr_number + " - " + dadosCliente.cli_addr_neighborhood + " - " + dadosCliente.cli_addr_province + " " + dadosCliente.cli_addr_state,
                "dataPrevista": timeFormatado.dataFormatada,
                "horaPrevista": timeFormatado.horaFormatada,
                "phone": "34997801829",
                "task": listaOrdes[i].ticket_title
            }

            if (verificarSeEstaDentroDasCondicoes === 72) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco", "a4b58365-03b8-4bb0-a531-b0194ef68397");
                continue;
            }

            if (verificarSeEstaDentroDasCondicoes === 48) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco", "a4b58365-03b8-4bb0-a531-b0194ef68397");
                continue;
            }

            if (verificarSeEstaDentroDasCondicoes === 24) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco", "a4b58365-03b8-4bb0-a531-b0194ef68397");
                continue;
            }

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


function verificarHorasRestantes(timestampAlvo) {
    const alvo = new Date(timestampAlvo.replace(" ", "T") + "-03:00");

    const agoraUTC = new Date();
    const agora = new Date(agoraUTC.getTime() - 3 * 60 * 60 * 1000);

    const alvoData = new Date(alvo.getFullYear(), alvo.getMonth(), alvo.getDate());
    const agoraData = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

    const diffDias = Math.floor((alvoData - agoraData) / (1000 * 60 * 60 * 24));

    if (diffDias === 3) return 72;
    if (diffDias === 2) return 48;
    if (diffDias === 1) return 24;

    return false;
}



// PORTA=4011
// TOKEN="Sq6HwAhjAnyGgBS6fgtDRIFvFxYxZ57nPxrh83t5XIRrKysmP6CcEFPxRUtTDgBm"
// USUARIO="blip"
// SENHA="blip"
// URL="http://controllr.boxtele.com.br:8081"
// TOKENROTEADOR=""
// IDROTEADOR=""
// CONTRACTIDBUSSINES="Telek"