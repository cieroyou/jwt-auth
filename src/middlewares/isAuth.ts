import { Request, Response, NextFunction } from 'express'
import jwt from 'express-jwt'
import dotenv from 'dotenv';
dotenv.config();



const getTokenFromHeader = (req: Request)=> {
    // 사용자 요청 헤더에 jwt 토큰이 있는지 확인하고, 토큰을 return함
    const authHeader = req.headers['authorization']
    // const authHeader = req.headers.authorization; //Bearer

    //if we had authHeader, then return the authHeader.spilt(' ')[1]
    const token_info = authHeader && authHeader.split(' ')[0];
    if(token_info === 'Bearer' || token_info === 'Token'){
        return authHeader.split(' ')[1];
    }
    return null;
}

export default jwt({
    secret : process.env.ACCESS_TOKEN_SECRET,
    userProperty: 'user',
    getToken: getTokenFromHeader
})