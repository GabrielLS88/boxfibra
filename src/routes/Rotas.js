import express from 'express';
import { Healthz } from '../controller/Healthz.js'; 

const Rotas = express.Router();

Rotas.get('/healthz', Healthz);