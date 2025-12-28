import { io } from 'socket.io-client'

const userData = JSON.parse(localStorage.getItem("ChatUserData"))
let token;
if (userData)
    token = userData.token;

export const socket = io(import.meta.env.SOCKET_URL, {
    autoConnect: true,
    auth: {
        token: token || "",
    },
}
)
