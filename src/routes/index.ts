import { Router } from 'express'
import user from './user'
import item from './item'


export default () =>{
    const app = Router(); //const router = express.Router();

    user(app) 
    item(app)
    return app;
}