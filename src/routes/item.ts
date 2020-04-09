// import isAuth from '../middlewares/isAuth';
// import attachCurrentUser from '../middlewares/attachCurrentUser'

// export default (app) => {
//     app.get('/item/', isAuth, async (req, res) => {
//         // if(err.name === 'UnauthorizedError'){
//         // }
//     })

//     app.get('/item/id', async(req,res) => {
//         return res.send('/item/id')
//     })
// }

import { Router, Request, Response} from 'express';
const route = Router(); //const route = express.Router();

export default (app: Router) => {
    // app.get('/user/login', async (req,res) => {
    //     return res.send('/user/login')
    // })

    route.get('/me', async (req: Request, res: Response) => {
        return res.send('/item/me')
    })
    app.use('/item', route);


};