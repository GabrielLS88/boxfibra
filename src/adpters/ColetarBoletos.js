import axios from "axios";
import qs from "qs";

export default async function ColetarBoletos() {
    try {
        const datas = getDataOpenAndCloseDoMesAtual()

        const data = qs.stringify({
            where: `[{"field":"client_status","oper":5,"value":0},{"field":"AND"},{"field":"invoice_deleted","oper":7,"value":false},{"field":"AND"},[{"field":"invoice_date_due","oper":4,"value":"${datas.dataOpen}"},{"field":"AND"},{"field":"invoice_date_due","oper":3,"value":"${datas.dataClose}"}]]`,
            dir: 'ASC'
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://controllr.boxtele.com.br:8081/invoice_ctl/invoice/list',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YmxpcDpuNDh5ZldMOA=='
            },
            data: data
        };

        const response = await axios.request(config);

        return {
            status: response.data?.success === true,
            mensagem: "Requisição realizada com sucesso",
            data: response.data
        };

    } catch (e) {
        console.error(e);
        return {
            status: false,
            mensagem: "Erro ao coletar boletos em aberto",
            data: e?.response?.data || e
        };
    }
}

function getDataOpenAndCloseDoMesAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = agora.getMonth(); // 0-indexado

    const dataOpen = new Date(ano, mes, 1, 0, 0, 0);
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const dataClose = new Date(ano, mes, ultimoDia, 23, 59, 59);

    function formatarData(data) {
        const yyyy = data.getFullYear();
        const mm = String(data.getMonth() + 1).padStart(2, '0'); // mês 0-indexado
        const dd = String(data.getDate()).padStart(2, '0');
        const hh = String(data.getHours()).padStart(2, '0');
        const mi = String(data.getMinutes()).padStart(2, '0');
        const ss = String(data.getSeconds()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }

    return {
        dataOpen: formatarData(dataOpen),
        dataClose: formatarData(dataClose),
    };
}

