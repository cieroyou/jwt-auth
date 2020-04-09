// const express = require('express');
// const app = express();
// const port = 3000;

import express, {Application, Request, Response, NextFunction} from 'express';
const port = 3001;
import routes from './routes'


const msg_startServer = 
`################################################
🛡️  Server listening on port: ${port} 🛡️ 
################################################`;

async function startServer(){
    // const app: express.Application = express();
    const app: Application = express();
    
    // app.get('/', (req: Request, res: Response, next: NextFunction) => {
    //     res.send('Hello')
    // })
    app.use('/',routes());

    // authError handlers
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(`error on request ${req.method} | ${req.url} | ${err.status} | ${err.code}`)
        if(err.name === 'UnauthorizedError'){
            return res
            .status(err.status)
            .send({message: err.message})
            .end();
        }
        return next(err);
    })
    app.listen(port, err => {
        if(err){
            console.log(err);
            return;
        }
        console.log(msg_startServer);
    })
}

startServer();
