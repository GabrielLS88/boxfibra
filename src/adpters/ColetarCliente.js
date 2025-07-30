import axios from "axios";
import qs from "qs";

export default async function ColetarCliente(idCliente) {
    try {
        const data = qs.stringify({
            where: `[{"field":"client_status","oper":5,"value":0},{"field":"AND"},{"field":"client.client_pk","oper":5,"value":${idCliente}}]`,
            sort: 'client_complete_name'
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://controllr.boxtele.com.br:8081/controllrctl/phone/list',
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
            mensagem: "Erro ao coletar dados do cliente",
            data: e?.response?.data || e
        };
    }
}
