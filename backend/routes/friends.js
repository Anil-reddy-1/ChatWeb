const { pipeline } = require("node:stream");
const { Authorization } = require("../middleware/Authorization");
const { Friends } = require("../modal/friends.model");
const {Room} =require("../modal/room.model")
const route = require("express").Router()


route.get("/", Authorization, async (req, res) => {
    try {
        const data = await Friends.aggregate([
            {
                $match: {
                    userId: req.userId
                }
            },
            { $unwind: "$friends" },
            { $match: { "friends.status": "friend" } },
            {
                $addFields: {
                    friendId: { $toObjectId: "$friends.userId" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendId",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            { $unwind: "$friend" },
            {
                $lookup: {
                    from: "messages",
                    let: { chatId: "$friends.chatId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$chatId", "$$chatId"]
                                }
                            }
                        },
                        {
                            $sort: { createdAt: -1 }
                        },
                        {
                            $limit: 1
                        }
                    ],
                    as: "lastMessage"
                }
            },
            {
                $unwind: {
                    path: "$lastMessage",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    id: "$friends.userId",
                    name: "$friend.name",
                    dp: "$friend.dp",
                    chatId:"$friends.chatId",
                    isOnline: "$friend.isOnline",
                    lastMessage: "$lastMessage.msg",
                    lastMessageTime: "$lastMessage.createdAt"

                }
            }
        ])

        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})

route.post("/", Authorization, async (req, res) => {
    try {
        const { friendId } = req.body;

        const alreadyExists = await Friends.findOne({
            userId: req.userId,
            friends: { $elemMatch: { userId: friendId } }
        });

        if (alreadyExists)
            return res.status(400).json({ message: "Already requested / friends" });


        const addedData = await Friends.updateOne({ userId: req.userId }, {
            $addToSet: {
                friends: {
                    userId: friendId,
                    status: "requested",
                }
            }
        })

        const friendData = await Friends.updateOne({ userId: friendId }, {
            $addToSet: {
                friends: {
                    userId: req.userId,
                    status: "pending"
                }
            }
        })

        return res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})

route.get("/requests", Authorization, async (req, res) => {
    try {
        const data = await Friends.aggregate([
            {
                $match: {
                    userId: req.userId
                }
            },
            { $unwind: "$friends" },
            { $match: { "friends.status": "pending" } },
            {
                $addFields: {
                    friendId: { $toObjectId: "$friends.userId" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendId",
                    foreignField: "_id",
                    as: "friend"
                }
            },
            { $unwind: "$friend" },
            {
                $project: {
                    _id: "$friends.userId",
                    name: "$friend.name",
                    Dp: "$friend.Dp",
                }
            }
        ])

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }
})

route.post("/reject", Authorization, async (req, res) => {
    try {
        const { friendId } = req.body;
        let data = await Friends.findOne({ userId: req.userId, friends: { $elemMatch: { userId: friendId } } })

        if (!data)
            return res.status(403).json({ message: "invalid request not found in list" })

        await Friends.updateOne({ userId: req.userId }, {
            $pull: {
                friends: { userId: friendId }
            }
        })

        data = await Friends.findOne({ userId: friendId, friends: { $elemMatch: { userId: req.userId } } })

        if (!data)
            return res.status(403).json({ message: "invalid request not found in list" })

        await Friends.updateOne({ userId: friendId }, {
            $pull: {
                friends: { userId: req.userId }
            }
        })

        return res.status(200).json({ message: "updateed successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})

route.post("/accept", Authorization, async (req, res) => {
    try {
        const { friendId } = req.body;
       
        let data = await Friends.findOne({ userId: req.userId, friends: { $elemMatch: { userId: friendId } } })
       
        if (!data)
            return res.status(403).json({ message: "invalid request not found in list" })

        const participants = [req.userId, friendId];

        data = await Room.findOne({
            participants: {
                $all: participants,
                $size: participants.length
            }
        });
        

        if (!data) {
            data = await Room.create({
                participants: participants
            })
        }
        const chatId = data._id;

        await Friends.updateOne(
            { userId: req.userId },
            { $set: { "friends.$[f].status": "friend", "friends.$[f].chatId": chatId } },
            { arrayFilters: [{ "f.userId": friendId }] }
        );


        await Friends.updateOne(
            { userId: friendId },
            { $set: { "friends.$[f].status": "friend", "friends.$[f].chatId": chatId } },
            { arrayFilters: [{ "f.userId": req.userId }] }
        );

        return res.status(200).json({ message: "updated successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})


route.post("/unfriend", Authorization, async (req, res) => {
    try {
        const { friendId } = req.body;
        let data = await Friends.findOne({ userId: req.userId, friends: { $elemMatch: { userId: friendId } } });

        if (!data) return res.status(201).json({ message: "no friend" });

        await Friends.updateOne({ userId: req.userId }, {
            $pull: {
                friends: { userId: friendId }
            }
        })
        await Friends.updateOne({ userId: friendId }, {
            $pull: {
                friends: { userId: req.userId }
            }
        })
        res.status(200).json({ message: "Unfriended suceessfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server Error" });
    }
})

module.exports = route