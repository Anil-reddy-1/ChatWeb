const mongoose = require("mongoose")




const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, { timestamps: true })



const roomSchema = mongoose.Schema({
    participants: {
        type: [String],
        required: true,
    },//can add group bool
}, { timestamps: true })



const Message = mongoose.model("Message", messageSchema);
const Room = mongoose.model("Room", roomSchema);

module.exports = { Message, Room }

