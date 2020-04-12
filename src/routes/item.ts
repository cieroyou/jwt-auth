import authentifiacteToken from '../middlewares/isAuth';
// import attachCurrentUser from '../middlewares/attachCurrentUser'
import { Router, Request, Response} from 'express';
const route = Router(); //const route = express.Router();

export default (app: Router) => {
    // app.get('/user/login', async (req,res) => {
    //     return res.send('/user/login')
    // })
    route.get('/posts', authentifiacteToken, (req: Request, res: Response) => {
        console.log('req.user' , req.user);
        const posts = [
            {
                name: 'Kyle',
                title: 'Post 1'
            },
            {
                name: 'Sera',
                title: 'Post 2'
            }
        ]
        const user = req.user;
        return res.json(posts.filter(post => post.name === req.user.name))
    })


    route.get('/me', async (req: Request, res: Response) => {
        return res.send('/item/me')
    })
    app.use('/item', route);


};