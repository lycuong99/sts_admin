
import jwt_decode from "jwt-decode";

export default class JwtToken {
    static get = () => localStorage.getItem('sts_token');
    static set = (token) => localStorage.setItem('sts_token', token);
    static clear = () => localStorage.removeItem('sts_token');
    static setUsername = (username) => localStorage.setItem('sts_username', username);
    static getUsername = () => localStorage.getItem('sts_username');

    static setJWTDecode = (token) => localStorage.setItem('jwt_decode', JSON.stringify(jwt_decode(token)));
    static getJWTDecodeObj = () => JSON.parse(localStorage.getItem("jwt_decode"));
}