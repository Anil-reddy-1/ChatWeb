const express = require("express");
const route = express.Router();
const { Message } = require("../modal/room.model")
const { Authorization } = require("../middleware/Authorization");

route.get('/:chatId',Authorization, async (req, res) => {
    try {
        const { chatId } = req.params;

        const msgList = await Message.find({ chatId: chatId }).sort({ createdAt: 1 })
        res.status(200).json(msgList);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server exception" });
    }
})

route.post('/',Authorization, async (req, res) => {
    try {
        const { chatId, msg, sender, time } = req.body;

        const msgList = await Message.create({ chatId: chatId, sender: sender, msg: msg, time: time })
        res.status(200).json(msgList);
    } catch (error) {
        res.status(500).json({ message: "server exception" });
    }
})
module.exports = route