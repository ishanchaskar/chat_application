const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Correct reference name
    },
    content: { type: String, trim: true },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat", // Correct reference name
    },
}, {
    timestamps: true, // Fixed typo 'timestamp' to 'timestamps'
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
