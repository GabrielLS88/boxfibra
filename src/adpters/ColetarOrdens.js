import axios from "axios";
import qs from "qs";

export default async function ColetarOrdens() {
    try {
        const data = qs.stringify({
            where: '[[[{"field":"op_date_sched","oper":8,"value":null},{"field":"AND"},{"field":"op_date_answer","oper":7,"value":null},{"field":"AND"},{"field":"op_date_cancel","oper":7,"value":null}],{"field":"OR"},[{"field":"op_date_answer","oper":8,"value":null},{"field":"AND"},{"field":"op_date_start","oper":7,"value":null},{"field":"AND"},{"field":"op_date_cancel","oper":7,"value":null}],{"field":"OR"},[{"field":"op_date_start","oper":8,"value":null},{"field":"AND"},{"field":"op_date_finish","oper":7,"value":null},{"field":"AND"},{"field":"op_date_cancel","oper":7,"value":null}],{"field":"OR"},[{"field":"op_date_finish","oper":8,"value":null},{"field":"AND"},{"field":"op_date_close","oper":7,"value":null},{"field":"AND"},{"field":"op_date_cancel","oper":7,"value":null}]],{"field":"AND"},{"field":"op_deleted","oper":7,"value":false}]',
            sort: 'op_date_sched',
            dir: 'ASC'
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://controllr.boxtele.com.br:8081/support_ctl/os/list',
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
