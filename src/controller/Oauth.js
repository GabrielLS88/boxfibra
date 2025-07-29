

export async function Oauth(req, res, next) {
    try{
        const token = req.header("authorization");
        if(!token){
            return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
        }else if(!token.startsWith('Bearer ')){
            return res.status(401).json({ error: 'Token de autenticação inválido.' });
        }else if(token !== `Bearer ${process.env.TOKEN}`){
            return res.status(401).json({ error: 'Token de autenticação inválido.' });
        }else{
            next();
        }
    }catch(error){
        console.error('Error in Oauth controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}