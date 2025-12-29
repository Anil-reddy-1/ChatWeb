const express = require("express");
const app = express();
require("dotenv").config();
const { Message, Room } = require("./modal/room.model");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const server = require('http').createServer(app);
const userRoute = require("./routes/user");
const messageRoute = require("./routes/message");
const roomRoute = require("./routes/room");
const friendsRoute = require("./routes/friends");
const { socketAuthorization } = require("./middleware/Authorization");
const User = require("./modal/user.model");

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/user", userRoute);
app.use("/message", messageRoute);
app.use("/room", roomRoute);
app.use("/friends", friendsRoute);

app.get("/", (req, res) => {
    res.status(200).end("server conected");
})

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
})

io.use(socketAuthorization);

const setOnlinetrue = async (id) => {
    try {
        const res = await User.updateOne({_id:id},{isOnline:true})
    } catch (error) {
        console.log(error);
    }
}

const setOnlinefalse=async (id) => {
    try {
        const res = await User.updateOne({_id:id},{isOnline:false})
    } catch (error) {
        console.log(error);
    }
}

io.on("connection", (socket) => {
    console.log("socket is : ", socket.id);
    setOnlinetrue(socket.userId);

    socket.on("joinRoom", (chatId) => {
        socket.rooms.forEach((room) => {
            if (room !== socket.id && room !== chatId) {
                socket.leave(room);
            }
        })
        socket.join(chatId);
        console.log(`socket ${socket.id} joined room ${chatId}`)
    })

    socket.on("sendMessage", async (payload) => {
        try {
            const { chatId, msg, time, sender } = payload;
            console.log("message created")
            const message = await Message.create({ chatId: chatId, msg: msg, time: time || new Date(), sender: sender })
            console.log("message created")
            io.to(chatId).emit("message", message);
            console.log("message sent")
        } catch (error) {
            console.log("message Error", error);
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected")
        setOnlinefalse(socket.userId);
    })

})



mongoose.connect(process.env.DB_URL) 
    .then((res) => {
        console.log("connected to db");
        const PORT=process.env.PORT || 5000
        server.listen(PORT,"0.0.0.0" ,() => {
            console.log("HTTP+socket port activated")
        });
    }).catch((err) => {
        console.log("db connection failed", err);
    })









