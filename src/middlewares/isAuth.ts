import { IUser } from './../interfaces/IUser';
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import HttpException from '../exceptions/HttpException'
// import jwt from 'express-jwt'


const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    // const authHeader = req.headers.authorization; //Bearer

    //if we had authHeader, then return the authHeader.spilt(' ')[1]
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null || token ===undefined){
        next(new HttpException(401,'Not include AccessToken'));        
    } 
   
    try{
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('user', user);
        req.user = user;
        next();
    }catch(err){
        next(new HttpException(403, err.message))
    }
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