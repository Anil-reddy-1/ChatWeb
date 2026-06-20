import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_BACK_URL, {
    autoConnect: false,
});

export const connectSocket = (token) => {
    if (!token) return;
    socket.auth = { token };
    socket.connect();
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};
