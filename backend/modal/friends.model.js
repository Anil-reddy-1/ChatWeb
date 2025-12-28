const mongoose = require("mongoose")


const FriendsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    friends: {
        type: [{
            userId: {
                type: String,
                required: true
            },
            chatId: {
                type: String,
                required: false
            },
            status: {
                type: String,
                required: true
            },
        }],
        default: []
    }
}, { timestamps: true })

const Friends = mongoose.model("Friend", FriendsSchema);

module.exports = { Friends }