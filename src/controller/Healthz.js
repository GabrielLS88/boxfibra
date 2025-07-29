

export async function Healthz(req, res){
    try{
        const healthStatus = {
            status: 'ok',
            timestamp: new Date().toISOString()
        };
        return res.status(200).json(healthStatus);
    }catch(err){
        console.error('Error in Healthz controller:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}