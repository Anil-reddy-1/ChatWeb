import axios from "axios";

const userData = JSON.parse(localStorage.getItem("ChatUserData"))
let token;
if (userData)
    token = userData.token;
else
    token = ""
const api = axios.create({
    baseURL: import.meta.env.BACK_URL,
    headers: {
        authorization: 'Bearer ' + token
    }
})

export { api }

