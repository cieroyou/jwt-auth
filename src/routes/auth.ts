//load envFile
import dotenv from 'dotenv'
import { Router, Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
dotenv.config();
const route = Router();

//middleware
const authentifiacteToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    // const authHeader = req.headers.authorization; //Bearer

    //if we had authHeader then return the authHeader.spilt(' ')[1]
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null || undefined) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user:any) => {
        if(err) {
            return res.sendStatus(403);
        }
        //user : payload decoded from token
        req.user = user;
        next();
    })
}

// baseUrl : /api/auth
export default (app: Router) => {
    // api/auth/signup
    // 토큰 없이 api 요청 -> 회원가입 및 token 발급
    route.post('/signup', async (req, res) => {
        //Mock user
        const username = req.body.username;
        const user = { name: username };

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({acccessToken : accessToken});
    })

    route.get('/posts', authentifiacteToken, (req,res) => {
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
        res.json(posts.filter(post => post.name === req.user.name))
    })
    
    // api/auth/signin
    // 토큰 없이 api 요청 -> 로그인 성공하면 token 발급 (token 정책 다르게 가져갈 수 잇음)

    // api/auth/logout
    // 토큰과 함께 api 요청

    app.use('/auth', route)
}
