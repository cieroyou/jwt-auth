import express, {Application, Request, Response, NextFunction} from 'express';
import HttpException from '../src/exceptions/HttpException'

const port = 3000;
import routes from './routes'
import bodyParser from 'body-parser';

export class App {
    private app : Application;
    private msg_startServer : string;
    
    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.errorHandlers();
        this.msg_startServer = 
        `################################################
🛡️  Server listening on port: ${this.app.get('port')} 🛡️ 
################################################`;
    }

    settings(){
        this.app.set('port', this.port || process.env.port || 3000);
    }

    middlewares(){
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json())
    }

    routes(){
        this.app.use('/',routes());
    }

    errorHandlers(){
        this.app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
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
    }
    async listen(){
        try {
            await this.app.listen(this.app.get('port'));
            console.log(this.msg_startServer);
        } catch (error) {
            console.log(error);
            return;
        }
    }
}
