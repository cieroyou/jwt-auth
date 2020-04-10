import { Router } from 'express'
import user from './user'
import item from './item'
import auth from './auth'

export default () =>{
    const app = Router(); //const router = express.Router();

    user(app) 
    item(app)
    auth(app)
    
    return app;
}