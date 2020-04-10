//load envFile
import dotenv from 'dotenv'
import { Router, Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
dotenv.config();
const route = Router();

// baseUrl : /api/auth
export default (app: Router) => {
    // api/auth/signup
    // 토큰 없이 api 요청 -> 회원가입 및 token 발급
    route.post('/signup', async (req, res) => {
        //Mock user
        const username = req.body.username;
        const user = { name: username };

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json(accessToken);
    })
    
    // api/auth/signin
    // 토큰 없이 api 요청 -> 로그인 성공하면 token 발급 (token 정책 다르게 가져갈 수 잇음)

    // api/auth/logout
    // 토큰과 함께 api 요청

    app.use('/auth', route)
}