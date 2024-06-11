import axios from "axios"

// const url = process.env.GATEWAY_DOMAIN
// body ={email:"", password:""}
const ApiLogin = async ({ email, password }) => {

    const rs = await axios.post(`http://localhost:8080/api/v1/login`, { email, password })
    return rs
}
const ApiLoginGG = async ({ accessToken }) => {

    const rs = await axios.post(`http://localhost:8080/api/v1/loginGoogle`, { accessToken })
    return rs
}
const Register = async ({ email, password, displayName }) => {

    const response = await axios.post('http://localhost:8080/api/v1/register', { email, password, displayName });

    return response;
}


export { ApiLogin, ApiLoginGG, Register }