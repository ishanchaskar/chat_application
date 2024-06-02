const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User", // Correct reference name
        }
    ],
    latestMessage: {
        type: mongoose.Schema.ObjectId,
        ref: "Message", // Correct reference name
    },
    groupAdmin: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Correct reference name
    }
},
{
    timestamps: true, // Fixed typo 'timestamp' to 'timestamps'
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
