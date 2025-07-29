import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Oauth } from './src/controller/Oauth.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORTA = process.env.PORTA;

app.get('/', Oauth, )

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})
