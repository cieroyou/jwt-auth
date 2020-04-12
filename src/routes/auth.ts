//load envFile
import dotenv from 'dotenv';
import { Router, Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser'
dotenv.config();
const route = Router();

// It will be null if sever restart. So you have to save refreshToken to database recommend Redis
let refreshTokens = [];

const generateAccessToken = (user: IUser) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'});
}

// baseUrl : /api/auth
export default (app: Router) => {
    // accessToken 재발급
    route.post('/token', async (req: Request, res: Response) => {
        const refreshToken = req.body.token;
        if(refreshToken === null) {
            res.sendStatus(401);
            // return;
        }
        if(!refreshTokens.includes(refreshToken)){
            res.sendStatus(403);
            // return;
        }
        //Todo : If refreshToken is expired, add logic
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any, user:IUser)=>{
            if(err) {
                res.sendStatus(403);
            }
            const accessToken = generateAccessToken(user);
            res.json({accessToken: accessToken});
        })
    })
    // api/auth/signup
    // 토큰 없이 api 요청 -> 회원가입 및 token 발급
    route.post('/signup', async (req, res) => {
        //Mock user
        const username = req.body.username;
        const user = { name: username };

        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

        refreshTokens.push(refreshToken);
        res.json({acccessToken : accessToken, refreshToken: refreshToken});
    })

    
    
    // api/auth/signin
    // 토큰 없이 api 요청 -> 로그인 성공하면 token 발급 (token 정책 다르게 가져갈 수 잇음)

    // api/auth/logout
    // 토큰과 함께 api 요청

    app.use('/auth', route)
}
