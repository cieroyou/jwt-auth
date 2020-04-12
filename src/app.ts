// import { express } from 'express';
// const express = require('express');
// const app = express();
// const port = 3000;

import express, {Application, Request, Response, NextFunction} from 'express';
// import * as express from 'express';
import HttpException from '../src/exceptions/HttpException'

const port = 3000;
import routes from './routes'
import bodyParser from 'body-parser';

const msg_startServer = 
`################################################
🛡️  Server listening on port: ${port} 🛡️ 
################################################`;

async function startServer(){
    // const app: express.Application = express();
    const app: Application = express();
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json())
    // app.get('/', (req: Request, res: Response, next: NextFunction) => {
    //     res.send('Hello')
    // })
    app.use('/',routes());

    // authError handlers
    app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
        console.log(`error on request ${req.method} | ${req.url} | ${err.status} | ${err.message}`)
        if(err.name === 'UnauthorizedError'){
            return res
            .status(err.status)
            .send({message: err.message})
            .end();
        }
        res.status(err.status).send({message: err.message}).end
        next(err);
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
