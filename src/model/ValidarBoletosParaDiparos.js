import AutenticacaoApi from "../adpters/AutenticacaoApi.js";
import ColetarBoletos from "../adpters/ColetarBoletos.js";
import EnviarMensagemTamplateBoleto from "../adpters/EnviarMensagemTamplateBoleto.js";

export default async function ValidarBoletosParaDiparos() {
    try {
        
        const autenticacao = await AutenticacaoApi();

        if (autenticacao.status === false) {
            return {
                status: false,
                mensagem: "Erro ao autenticar login para requisições",
                data: autenticacao.data
            }
        }

        const coletandoBoletosAtivos = await ColetarBoletos();

        if (coletandoBoletosAtivos.status === false) {
            return {
                status: false,
                mensagem: "Erro ao coletar boletos....",
                data: autenticacao.data
            }
        }

        if (coletandoBoletosAtivos.data.results.length === 0) {
            return {
                status: true,
                mensagem: "Não foi encontrado nenhuma ordem para validar....",
                data: autenticacao.data
            }
        }

        //const boletoDefinido = coletandoBoletosAtivos.data.results;
        const boletoDefinido = [
            {
                "invoice_pk": 85931,
                "invoice_document_number": null,
                "invoice_amount_document": "69.90",
                "invoice_amount_paid": null,
                "invoice_payment_method": null,
                "invoice_payment_cmc7": null,
                "invoice_nosso_num": "00003387900000053221",
                "invoice_date_due": "2025-08-25",
                "invoice_date_document": "2024-08-12 09:49:01.139729",
                "invoice_date_credit": null,
                "invoice_msg": null,
                "invoice_valid": false,
                "invoice_parcel": false,
                "invoice_proportional": false,
                "invoice_client_view": null,
                "invoice_gn_key": "752161730",
                "invoice_gn_link": "https://download.gerencianet.com.br/v1/33879_58344_PALUA6/33879-53221-ENAMEH9",
                "invoice_payment_type": 0,
                "invoice_gn_carne_lote": null,
                "contract_pk": 6,
                "invoice_deleted": false,
                "invoice_nf_date_emitted": null,
                "invoice_mail_date": null,
                "invoice_type": 0,
                "client_pk": 6,
                "invoice_schedule_status": 2,
                "invoice_remittance_date_emission": null,
                "bank_account_pk": 2,
                "invoice_barcode": "36490.00092 00003.387909 00000.532218 5 00000000006990",
                "invoice_gn_charge_id": 752161730,
                "invoice_amount_nf": "69.90",
                "invoice_rate_fine": "2",
                "invoice_rate_interest": "0.033",
                "invoice_discount_due_amount": "0",
                "invoice_remittance_status": 0,
                "invoice_gn_error": "",
                "invoice_gn_error_description": "",
                "invoice_gn_carne_parcel": null,
                "invoice_due_payment_limit": 0,
                "invoice_client_show": true,
                "invoice_client_print": true,
                "invoice_system_change": false,
                "carnet_pk": 9377,
                "invoice_agency_recipient": null,
                "invoice_wallet": null,
                "invoice_nossonum_billet": "00003387900000053221",
                "invoice_gn_link2": "https://download.gerencianet.com.br/33879_58344_PALUA6/33879-53221-ENAMEH9.pdf", // Link dock
                "bank_payment_pk": null,
                "invoice_qrcode": "00020101021226940014BR.GOV.BCB.PIX2572qrcodespix.sejaefi.com.br/bolix/v2/cobv/88c099c77ca44559b109fa3f3659e33d5204000053039865802BR5905EFISA6008SAOPAULO62070503***63042D69",
                "invoice_qrcode_image": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NSA0NSIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMCAwaDQ1djQ1SDB6Ii8+PHBhdGggc3Ryb2tlPSIjMDAwMDAwIiBkPSJNMCAwLjVoN20xIDBoMm0zIDBoMm0yIDBoMW0xIDBoMm0zIDBoMm0xIDBoMW0xIDBoM200IDBoMW0xIDBoN00wIDEuNWgxbTUgMGgxbTMgMGgxbTEgMGgxbTMgMGgxbTcgMGgxbTQgMGgxbTEgMGgybTIgMGgxbTIgMGgxbTUgMGgxTTAgMi41aDFtMSAwaDNtMSAwaDFtMyAwaDFtMSAwaDJtMyAwaDJtMyAwaDVtMSAwaDFtMSAwaDJtMSAwaDFtMSAwaDFtMiAwaDFtMSAwaDNtMSAwaDFNMCAzLjVoMW0xIDBoM20xIDBoMW00IDBoMW0zIDBoMm0xIDBoNG00IDBoMW0xIDBoMW0yIDBoMm0yIDBoMm0xIDBoMW0xIDBoM20xIDBoMU0wIDQuNWgxbTEgMGgzbTEgMGgxbTIgMGgxbTMgMGgzbTIgMGgxbTEgMGg4bTEgMGgxbTIgMGg1bTEgMGgxbTEgMGgzbTEgMGgxTTAgNS41aDFtNSAwaDFtMyAwaDJtNCAwaDNtMSAwaDFtMyAwaDFtMyAwaDJtMSAwaDFtNiAwaDFtNSAwaDFNMCA2LjVoN20xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoN004IDcuNWgzbTEgMGgxbTEgMGgxbTEgMGgxbTMgMGgxbTMgMGg1bTEgMGgxbTIgMGgxbTIgMGgxTTAgOC41aDJtMSAwaDJtMSAwaDFtMiAwaDJtMiAwaDFtMiAwaDJtMiAwaDVtMSAwaDJtMyAwaDNtMSAwaDFtMiAwaDFtNSAwaDFNMCA5LjVoNG03IDBoMW0xIDBoMm0xIDBoMW00IDBoMm0zIDBoMW0xIDBoMW0yIDBoMW01IDBoMm0xIDBoMW0xIDBoMW0xIDBoMU0wIDEwLjVoMm0xIDBoNG0xIDBoM20xIDBoMm00IDBoMW0zIDBoMW0yIDBoMW0xIDBoMW0zIDBoMm00IDBoM20yIDBoMW0xIDBoMU0wIDExLjVoMm0zIDBoMW0zIDBoMW0yIDBoMW0zIDBoMW0yIDBoMW0zIDBoMm0zIDBoMW0xIDBoMW01IDBoMW0xIDBoNU0xIDEyLjVoMm0yIDBoNm0xIDBoMm0yIDBoMm0xIDBoMm0zIDBoMW0yIDBoNW0xIDBoMm0zIDBoM20xIDBoMW0xIDBoMU0wIDEzLjVoMW0xIDBoNG01IDBoMm0zIDBoMm0xIDBoMm0yIDBoMW0xIDBoMW00IDBoM200IDBoMW0xIDBoMk0wIDE0LjVoNG0yIDBoMW0yIDBoMW0xIDBoMm0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoM20xIDBoMW0xIDBoOG0xIDBoMm0yIDBoMm0yIDBoMk0wIDE1LjVoNm0xIDBoMm0xIDBoMm00IDBoMW0xIDBoMW00IDBoNW0zIDBoMW0xIDBoMm0yIDBoNG0xIDBoMW0xIDBoMU0xIDE2LjVoMW0xIDBoNW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0xIDBoM20xIDBoMW0xIDBoMm0xIDBoMm0yIDBoMW0yIDBoMm0yIDBoMW0xIDBoMm0yIDBoMU0wIDE3LjVoMm0xIDBoMW0zIDBoMW0yIDBoMW00IDBoMW0xIDBoM20yIDBoM20xIDBoNG0xIDBoMW0yIDBoMW0yIDBoMW0yIDBoMm0yIDBoMU0xIDE4LjVoNm0yIDBoN20xIDBoM20yIDBoMW0xIDBoMW0xIDBoMW0xIDBoMW0yIDBoMm0xIDBoMW01IDBoNU0wIDE5LjVoNG0xIDBoMW0yIDBoMm00IDBoN20yIDBoMW0yIDBoMW0xIDBoNm0yIDBoMm0xIDBoMk0zIDIwLjVoNm0yIDBoNG00IDBoNm0yIDBoMm0xIDBoMW00IDBoOU0wIDIxLjVoMm0yIDBoMW0zIDBoNG0xIDBoMm0xIDBoMm0yIDBoMW0zIDBoMW0xIDBoMm0yIDBoM20xIDBoMW0xIDBoMW0zIDBoNU0wIDIyLjVoMW0xIDBoM20xIDBoMW0xIDBoM20xIDBoMW0xIDBoMm00IDBoMW0xIDBoMW0xIDBoM200IDBoMW0xIDBoMW0xIDBoMm0xIDBoMW0xIDBoMW0xIDBoMU0wIDIzLjVoMm0xIDBoMm0zIDBoMW0xIDBoMW0yIDBoMW0xIDBoMW0xIDBoMW0yIDBoMW0zIDBoMm0xIDBoMW0xIDBoMW0xIDBoNG0xIDBoMW0zIDBoM20xIDBoMU0wIDI0LjVoMW0zIDBoNW0yIDBoNG0xIDBoMW0zIDBoNW0yIDBoMW0xIDBoNG0zIDBoNW0xIDBoMk0wIDI1LjVoMm0yIDBoMm0xIDBoMW0zIDBoMW0yIDBoMW0zIDBoNW0yIDBoMm0xIDBoMW0xIDBoMW0xIDBoM20xIDBoMW0zIDBoMW0yIDBoMk0yIDI2LjVoMW0xIDBoMW0xIDBoMW0xIDBoM20yIDBoMm0xIDBoNG0xIDBoMW0xIDBoMW0yIDBoNG0xIDBoNW0xIDBoMW0yIDBoMW0xIDBoMk0wIDI3LjVoMW0yIDBoMW0xIDBoMW00IDBoMm0xIDBoMW0yIDBoMm02IDBoMW0zIDBoMW00IDBoMm0xIDBoM20zIDBoMW0xIDBoMU0xIDI4LjVoMm0zIDBoM20zIDBoMW00IDBoMW0xIDBoMm0xIDBoMW0yIDBoMW0yIDBoMm0xIDBoMW0xIDBoMW0xIDBoMW0yIDBoMm0yIDBoMW0xIDBoMU0wIDI5LjVoNG03IDBoM20yIDBoMW0zIDBoMW0zIDBoM20xIDBoMm0xIDBoMm0xIDBoMm0yIDBoMW0xIDBoNE0xIDMwLjVoMW00IDBoM20xIDBoMm0zIDBoNm0xIDBoNG0xIDBoMW0xIDBoMm00IDBoMW0xIDBoMW0yIDBoNE00IDMxLjVoMW00IDBoMm0yIDBoMW0xIDBoNW0xIDBoMm0xIDBoN20zIDBoMW0xIDBoM20yIDBoMW0xIDBoMU0zIDMyLjVoMW0yIDBoM20xIDBoM20xIDBoM20xIDBoNG01IDBoMW0yIDBoM20xIDBoNW0xIDBoNU0zIDMzLjVoMW0zIDBoMW0xIDBoMW0yIDBoMW0xIDBoMm0xIDBoNW0xIDBoMW0zIDBoMm0zIDBoMm0xIDBoMm00IDBoMW0yIDBoMU00IDM0LjVoMW0xIDBoM20xIDBoMW0xIDBoMW0yIDBoNm0xIDBoMW0xIDBoMm0xIDBoMm00IDBoM20zIDBoMW0xIDBoMm0xIDBoMU0xIDM1LjVoNG0yIDBoMW0yIDBoNm0yIDBoMW0xIDBoMW0yIDBoMW0yIDBoMW0yIDBoM20yIDBoMW0xIDBoMm0yIDBoMm0xIDBoMU0wIDM2LjVoMW0yIDBoMm0xIDBoMW0xIDBoM20xIDBoMm0yIDBoMTBtMiAwaDNtMSAwaDJtMiAwaDVtMyAwaDFNOCAzNy41aDFtMSAwaDFtNSAwaDJtMSAwaDJtMyAwaDFtMiAwaDFtMiAwaDJtMyAwaDJtMyAwaDNtMSAwaDFNMCAzOC41aDdtMiAwaDFtMiAwaDJtMyAwaDFtMSAwaDJtMSAwaDFtMSAwaDFtMyAwaDFtMiAwaDRtMSAwaDFtMSAwaDFtMSAwaDFtMiAwaDFNMCAzOS41aDFtNSAwaDFtMyAwaDFtMSAwaDVtMiAwaDJtMyAwaDRtMSAwaDFtMSAwaDFtMyAwaDJtMyAwaDNNMCA0MC41aDFtMSAwaDNtMSAwaDFtMSAwaDFtMiAwaDJtMSAwaDFtNSAwaDZtMSAwaDFtMSAwaDJtMSAwaDNtMSAwaDdNMCA0MS41aDFtMSAwaDNtMSAwaDFtMSAwaDFtNCAwaDFtMiAwaDNtMyAwaDJtMiAwaDJtMSAwaDJtMyAwaDFtMyAwaDJtMSAwaDJNMCA0Mi41aDFtMSAwaDNtMSAwaDFtMiAwaDFtMSAwaDFtMSAwaDJtMSAwaDJtMiAwaDNtMSAwaDFtMyAwaDFtMSAwaDFtMSAwaDJtMSAwaDFtMSAwaDFtMiAwaDFtMiAwaDJNMCA0My41aDFtNSAwaDFtMSAwaDRtMiAwaDFtMiAwaDFtMyAwaDFtMSAwaDFtNyAwaDFtNCAwaDFtNSAwaDFtMSAwaDFNMCA0NC41aDdtMSAwaDFtMiAwaDFtMSAwaDJtMSAwaDFtMSAwaDJtMSAwaDFtMiAwaDJtMSAwaDFtMyAwaDFtMSAwaDNtMiAwaDRtMSAwaDEiLz48L3N2Zz4=",
                "invoice_nf_number": "0",
                "invoice_reason": "",
                "invoice_msg_date": null,
                "invoice_op_code": 0,
                "client_phones": "FIXO#-#3333431714, CELULAR#-#33988299208",
                "client_emails": null,
                "contract_number": 1293,
                "contract_pay_day": 25,
                "contract_free": 0,
                "contract_amount": "79.9000",
                "contract_pay_discount": "0.00",
                "contract_date_cad": "2014-10-28 15:11:51",
                "contract_status": 1,
                "contract_deleted": false,
                "contract_observations": "",
                "contract_block_type": 0,
                "contract_date_last_paymentobservation": null,
                "contract_tax_cfop": 5307,
                "contract_block_auto": 1,
                "offices_pk": 4,
                "address_pk": 376,
                "invoice_date_now": "2025-08-07",
                "bank_account_code": "efi",
                "bank_account_identification": "EFI Bank - Pro",
                "bank_account_gateway": true,
                "bank_account_billet": true,
                "bank_account_card": true,
                "bank_account_pix": true,
                "bank_account_agency": "",
                "bank_account_num_convenio": "",
                "bank_account_num_convenio_dv": "0",
                "bank_payment_code": null,
                "bank_payment_identification": null,
                "client_name": "LUCILENE",
                "client_lastname": "TARDEM DE ASSUNCAO",
                "client_complete_name": "LUCILENE TARDEM DE ASSUNCAO",
                "client_status": 0,
                "client_type": 0,
                "client_doc1": "47339276653",
                "client_doc2": "M.3.207.589",
                "client_date_birth": "1959-02-26",
                "client_date_cad": "2011-11-04 00:00:00",
                "profile_pk": 4,
                "profile_name": "Residencial",
                "profile_color": "#0000FF",
                "profile_check_days": 62,
                "profile_check_holiday": 0,
                "profile_gen_day_adv": 0,
                "profile_gen_min_days": 0,
                "profile_rate_fine": "2",
                "profile_rate_interest": "0.033",
                "obs_pk": null,
                "obs_date_end": null,
                "invoice_late": false,
                "cli_addr_address": "RUA ANASTACIO SARAIVA",
                "cli_addr_number": "802",
                "cli_addr_neighborhood": "CENTRO",
                "cli_addr_zipcode": "36976000",
                "cli_addr_zip_fmt": "36.976-000",
                "cli_addr_province": "Alto Jequitibá",
                "cli_addr_state": "MG",
                "cli_addr_completation": "EM FRENTE AO DEPOSITO DA CONSTRULAR",
                "ctt_addr_address": "RUA ADRIANO GRIPP",
                "ctt_addr_number": "S/N",
                "ctt_addr_neighborhood": "CENTRO",
                "ctt_addr_zipcode": "36976000",
                "ctt_addr_zip_fmt": "36.976-000",
                "ctt_addr_province": "Alto Jequitibá",
                "ctt_addr_state": "MG",
                "ctt_addr_completation": "PROX AO GALPAO DA CONSTRULAR"
            }
        ]

        console.log(`🔷 Foram encontrados ${boletoDefinido.length} clientes`);

        for (let i = 0; i < boletoDefinido.length; i++) {
            if (boletoDefinido[i].invoice_amount_paid == null) {
                const dadosInfo = {
                    "valor": boletoDefinido[i].invoice_amount_document,
                    "linkPagamento": boletoDefinido[i].invoice_gn_link,
                    "dataVencimento": formatarData(boletoDefinido[i].invoice_date_due),
                    "phone": "3432937122",
                    "referente": boletoDefinido[i].profile_name
                }

                console.log(`🔵 Valor: ${dadosInfo.valor}, 🟢 Link Pagamento: ${dadosInfo.linkPagamento}, ⚪ Data Vencimento: ${dadosInfo.dataVencimento}, 🟡 Referente: ${dadosInfo.referente}`);
                await EnviarMensagemTamplateBoleto(dadosInfo, "teste_box_fibra_cobranca_correto", "123cca07-765d-4832-8c54-73086cee7894");
                continue;
            }
        }

        return {
            status: coletandoBoletosAtivos.status,
            mensagem: coletandoBoletosAtivos.mensagem,
            data: coletandoBoletosAtivos.data
        }

    } catch (e) {
        return {
            status: false,
            mensagem: "Erro ao validar ordens",
            data: e
        }
    }
}


function formatarData(isoDate) {
  const data = new Date(isoDate);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}


// PORTA=4011
// TOKEN="Sq6HwAhjAnyGgBS6fgtDRIFvFxYxZ57nPxrh83t5XIRrKysmP6CcEFPxRUtTDgBm"
// USUARIO="blip"
// SENHA="blip"
// URL="http://controllr.boxtele.com.br:8081"
// TOKENROTEADOR=""
// IDROTEADOR=""
// CONTRACTIDBUSSINES="Telek"

