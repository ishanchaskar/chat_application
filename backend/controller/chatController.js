const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel'); // Ensure correct import

require('dotenv').config();

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log('user id not found');
        return res.sendStatus(402);
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate('users', '-password').populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email',
    });

    if (isChat.length > 0) { // Fixed typo 'lenght' to 'length'
        res.send(isChat[0]);
    } else {
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId] // Fixed typo 'user' to 'users'
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
            res.status(201).send(fullChat); // Changed status code to 201 for resource creation
        } catch (error) {
            res.status(400); // Changed status code to 400 for bad request
            throw new Error(error.message);
        }
    }
});

module.exports = { accessChat };
