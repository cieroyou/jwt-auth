import { Router, Request, Response, NextFunction} from 'express'
import { sign } from 'jsonwebtoken'
const route = Router();

// baseUrl : /api/auth
export default (app: Router) => {
    // api/auth/signup
    // 토큰 없이 api 요청 -> 회원가입 및 token 발급
    route.get('/signup', (req, res) => {
        //Mock user
        const user = {
            id: 1,
            username :'sera',
            email: 'cieroyou1@gmail.com'
        }
        sign({user: user}, 'secretkey', (err: any, token) => {
            return res.send(token)
        })
        // return res.send('/auth/signup')
    })
    
    // api/auth/signin
    // 토큰 없이 api 요청 -> 로그인 성공하면 token 발급 (token 정책 다르게 가져갈 수 잇음)

    // api/auth/logout
    // 토큰과 함께 api 요청

    app.use('/auth', route)
}