const mongoose = require('mongoose');
const chatModel = mongoose.Schema({
    chatName: {type: String , trim: true},
    isGroupChat: {type: Boolean, default: false},
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
        }
    ],
    latestMessage: {type: mongoose.Schema.ObjectId, 
        ref: "messages",
    },
    groupAdmin: {type: mongoose.Schema.ObjectId , ref:"Users"},

},
{
    timestamp:true,
})

const Chats = mongoose.model("Chats", chatModel);
module.exports = Chats;