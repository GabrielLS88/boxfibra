import axios from "axios";
import qs from "qs";

export default async function ColetarSuportes() {
    try {
        const data = qs.stringify({
            where: '[{"field":"ticket_status","oper":21,"value":[0,2,3,4]},{"field":"AND"},{"field":"ticket_deleted","oper":7,"value":false}]',
            sort: 'ticket_pk',
            dir: 'ASC'
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://controllr.boxtele.com.br:8081/support_ctl/ticket/list',
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
            mensagem: "Erro ao coletar ordens de serviços abertas",
            data: e?.response?.data || e
        };
    }
}
