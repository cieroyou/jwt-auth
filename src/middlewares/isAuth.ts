import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
// import jwt from 'express-jwt'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
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
    console.log('checking Auth')
  }

export default isAuth;

// const getTokenFromHeader = () => {
//     // 사용자 요청 헤더에 jwt 토큰이 있는지 확인하고, 토큰을 return함
//     let jwt_token = '';
//     console.log('isAuth - getTokenFromHeader')
//     return jwt_token
// }

// export default jwt({
//     secret : 'aaaa',
//     userProperty: 'token',
//     getToken: getTokenFromHeader
// })