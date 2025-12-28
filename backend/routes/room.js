const express = require("express");
const route = express.Router();
const { Room } = require("../modal/room.model")
const { Authorization } = require("../middleware/Authorization");

route.post("/",Authorization, async (req, res) => {

    try {
        if (!Array.isArray(req.body.participants)) {
            return res.status(400).json({ message: "participants must be an Array" });
        }

        const data = await Room.findOne({
            participants: {
                $all: req.body.participants,
                $size:req.body.participants.length
            }
        });


        if (!data) {
            data = await Room.create({
                participants: req.body.participants
            })
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
})


route.get("/",Authorization,async (req,res)=>{
    try {
        const data = await Room.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Server Errror"});
    }
})

module.exports= route