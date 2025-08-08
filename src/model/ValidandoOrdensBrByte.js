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

        //const listaOrdes = coletandoOrdensAtivas.data.results;
        const listaOrdes = [
            {
                "op_pk": 26077,
                "op_date_create": "2025-05-28 17:16:56",
                "op_date_last": "2025-05-28 17:16:56",
                "op_type": 1,
                "op_code": 1,
                "op_status": 0,
                "op_deleted": false,
                "op_number": "20250528000006",
                "op_priority": 3,
                "op_sla": 2880,
                "op_date_sched": "2025-08-08 08:00:00",
                "op_date_answer": null,
                "op_date_start": null,
                "op_date_finish": null,
                "op_date_close": null,
                "op_date_cancel": null,
                "op_desc": "Cliente solicitou suporte técnico no escritório de Manhumirim",
                "op_obs": "",
                "op_file": null,
                "op_amount": "0.0",
                "op_client_show": false,
                "op_pos_accuracy": null,
                "op_pos_dir": null,
                "op_pos_lng": null,
                "op_pos_alt": null,
                "op_pos_lat": null,
                "op_pos_spd": null,
                "ticket_pk": 6013,
                "op_os_pk": null,
                "task_pk": 11,
                "op_invoice_status": 0,
                "invoice_pk": null,
                "invoice_details_pk": null,
                "staff_pk": null,
                "user_pk": 26,
                "address_pk": 2022,
                "cpe_pk": 2394,
                "op_date_diff_sched": null,
                "op_date_diff_answer": null,
                "op_date_diff_finish": null,
                "op_date_diff_close": null,
                "sla_expired": true,
                "op_client": false,
                "address_identification": "RESIDENCIAL",
                "address": "RUA NAMIR GUIMARAES",
                "address_number": "N 93",
                "address_neighborhood": "CENTRO",
                "address_siafi": 4789,
                "address_province": "Manhumirim",
                "address_state": "MG",
                "address_zipcode": "36970000",
                "address_completation": "",
                "address_latitude": "-20.3629283905029297",
                "address_longitude": "-41.9623947143554688",
                "ticket_protocol": "202503070000004",
                "contract_pk": 2757,
                "client_pk": 2105,
                "category_pk": 1,
                "ticket_date_create": "2025-03-07 16:34:07",
                "ticket_date_last": "2025-05-28 17:16:56",
                "ticket_amount": "0.0",
                "user_username": "aguia@boxfibra.com.br",
                "user_name": "Aguia",
                "staff_username": null,
                "staff_name": null,
                "task_name": "Suporte Fibra",
                "task_desc": "Suporte Fibra",
                "task_color": "#0800FF",
                "task_undo_desc": 1,
                "task_step_desc": 1,
                "task_finish_sign": 2,
                "task_finish_annex": 1,
                "task_finish_desc": 1,
                "task_finish_loc": 1,
                "task_address_loc": 1,
                "task_book_extra": 0,
                "contract_number": 2111,
                "contract_status": 0,
                "contract_date_cad": "2023-06-16 11:02:51",
                "contract_pay_day": 15,
                "client_complete_name": "SERGIO HERINGER COSTA",
                "client_observations": "",
                "client_status": 0,
                "client_type": 0,
                "cpe_status": 0,
                "cpe_state": 0,
                "cpe_deleted": true,
                "cpe_notice": 0,
                "cpe_auth_type": 3,
                "cpe_username": "sergio.heringer2@desenet.com.br",
                "cpe_password": "sergio.heringer2",
                "cpe_circuit_id": "",
                "cpe_nas_interface": "",
                "cpe_v4_ip": null,
                "cpe_v4_ip_last": "192.168.34.3",
                "cpe_v6_px": null,
                "cpe_v6_px_last": "",
                "cpe_v6_pd": null,
                "cpe_v6_pd_last": "",
                "cpe_v4_ip_status": 0,
                "cpe_v6_px_status": 0,
                "cpe_v6_pd_status": 0,
                "cpe_mac": null,
                "cpe_mac_last": "54:4B:54:1C:1F:49",
                "cpe_mac_status": 0,
                "cpe_sessions": 0,
                "cpe_access_login": "",
                "cpe_access_password": "",
                "cpe_access_port": "22",
                "cpe_obs": "",
                "cpe_tx_byte": 0,
                "cpe_rx_byte": 0,
                "cpe_wifi_encryption_type": 0,
                "cpe_wifi_encryption_password": null,
                "plan_pk": null,
                "plan_name": null,
                "dp_pk": null,
                "cpe_dp_port": 0,
                "dp_name": null,
                "dp_desc": null,
                "dp_num": null,
                "dp_limit": null,
                "dp_lat": null,
                "dp_lng": null
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
                "endereco": listaOrdes[i].address + " - " + listaOrdes[i].address_number + " - " + listaOrdes[i].address_neighborhood + " - " + listaOrdes[i].address_province + " " + listaOrdes[i].address_state,
                "dataPrevista": timeFormatado.dataFormatada,
                "horaPrevista": timeFormatado.horaFormatada,
                "phone": "34997801829",
                "task": listaOrdes[i].task_name
            }

            if (verificarSeEstaDentroDasCondicoes === 72) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco_72", "5afa90fb-5b4f-4813-9333-c6cb7b40e9b3");
                continue;
            }

            if (verificarSeEstaDentroDasCondicoes === 48) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco_48", "684793e0-c372-44ac-a8d4-65a04bc61bfd");
                continue;
            }

            if (verificarSeEstaDentroDasCondicoes === 24) {
                console.log(`🔵 Nome: ${dadosInfo.nome}, 🟢 Endereço: ${dadosInfo.endereco}, ⚪ Phone: ${dadosInfo.phone}, 🟡 Data da visita: ${dadosInfo.dataPrevista}, 🟠 Hora da visita: ${dadosInfo.horaPrevista}`);
                await EnviarMensagemTamplate(dadosInfo, "teste_box_fibra_endereco_24", "fb839fef-d88c-4192-a12d-8c4c122f2af9");
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

    // Ajuste: garantir que já seja interpretado como -03:00
    const data = new Date(`${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}T${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}:${String(segundo).padStart(2, '0')}-03:00`);

    const diaFormatado = String(data.getDate()).padStart(2, '0');
    const mesFormatado = String(data.getMonth() + 1).padStart(2, '0');
    const anoFormatado = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return {
        dataFormatada: `${diaFormatado}/${mesFormatado}/${anoFormatado}`,
        horaFormatada: `${horas}:${minutos}`
    };
}

function verificarHorasRestantes(timestampAlvo) {
    // Ajuste: já interpretar o timestamp com -03:00
    const alvo = new Date(timestampAlvo.replace(" ", "T") + "-03:00");

    const agora = new Date(); // já na hora local do servidor
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