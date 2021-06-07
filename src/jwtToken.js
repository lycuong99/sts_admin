
export default class JwtToken {

    static get = () => localStorage.getItem('sts_token');
    static set = (token) => localStorage.setItem('sts_token', token);
    static clear = () => localStorage.removeItem('sts_token');

}