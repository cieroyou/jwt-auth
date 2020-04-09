import jwt from 'express-jwt'
import {Request} from 'express'

const getTokenFromHeader = () => {
    // 사용자 요청 헤더에 jwt 토큰이 있는지 확인하고, 토큰을 return함
    let jwt_token = '';
    console.log('isAuth - getTokenFromHeader')
    return jwt_token
}

export default jwt({
    secret : 'aaaa',
    userProperty: 'token',
    getToken: getTokenFromHeader
})