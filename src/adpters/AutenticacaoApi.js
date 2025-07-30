import axios from "axios";

export default async function AutenticacaoApi(){
    try{
        const body = new URLSearchParams();
        body.append("username", "blip");
        body.append("password", "n48yfWL8");
        const response = await axios.post("http://controllr.boxtele.com.br:8081/login", body,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }
            }
        )

        return {
            status: response.data.success === true,
            messagem: "Requisição realizada",
            data: response.data
        }
    }catch(e){
        return {
            status: false,
            messagem: "erro no login de autenticação",
            data: e
        }
    }
}