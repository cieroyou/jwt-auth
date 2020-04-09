
import { Router, Request, Response} from 'express';


const route = Router();

import isAuth from '../middlewares/isAuth'

export default (app: Router) => {
    // if inside of
    // const app = Router(); //const router = express.Router();
    // const router = Router();
    // router.get('/list', (req,res)=>{
    //     res.send('/user/list')
    // })
    // app.use('/user', router);

    route.get('/list', isAuth, async (req: Request, res: Response) => {
        console.log('/user/list')
        return res.send('/user/list')
    })

    app.use('/user', route);

    
    // app.get('/user/login', async (req,res) => {
    //     return res.send('/user/login')
    // })

};