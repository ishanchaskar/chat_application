const mongoose = require('mongoose');
const messageModel = mongoose.Schema({
    sender: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
        }
    ],
    content: {type: String , trim: true},
    latestMessage: {type: mongoose.Schema.ObjectId, 
        ref: "Chats",
    },
},
{
    timestamp:true,
})

const Message = mongoose.model("Message", messageModel);
module.exports = Message;