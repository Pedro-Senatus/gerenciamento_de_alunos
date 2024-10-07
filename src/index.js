import express from 'express';
import router from './routes/alunoRouter.js';

const server = express();

const port = 5000;

server.use(express.json())
server.use(router)

server.listen(port, ()=>{
    console.log(`Server on in http://localhost:${port}`);
});