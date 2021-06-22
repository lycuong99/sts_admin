
export default class JwtToken {
    static get = () => localStorage.getItem('sts_token');
    static set = (token) => localStorage.setItem('sts_token', token);
    static clear = () => localStorage.removeItem('sts_token');
    static setUsername = (username) => localStorage.setItem('sts_username', username);
    static getUsername = () => localStorage.getItem('sts_username');
}