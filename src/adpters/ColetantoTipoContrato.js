import axios from "axios";
import qs from "qs";

export default async function ColetantoTipoContrato(idContrato) {
    try {
        const data = qs.stringify({
            where: `[{"field":"aaa_cpe.contract_pk","oper":5,"value":${idContrato}}]`
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://controllr.boxtele.com.br:8081/aaa_ctl/cpe/list',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YmxpcDpuNDh5ZldMOA=='
            },
            data: data
        };

        const response = await axios.request(config);

        return {
            status: response.data.success === true,
            mensagem: "Requisição realizada com sucesso",
            data: response.data.total > 0 ? response.data.results[0] : false
        };

    } catch (e) {
        console.error(e);
        return {
            status: false,
            mensagem: "Erro ao coletar contrato",
            data: false
        };
    }
}