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

const fetchChats = asyncHandler(async (req , res) =>{
try {
    Chat.find({users: { $elemMatch : { $eq: req.user._id}}})
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")
    .populate("latestMessage")
    .sort({updatedAt : -1})
    .then(async (results) => {
        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email"
        })
        res.status(200).send(results)
    })
} catch (error) {
    throw new Error(error.message)
}
})
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    let users;
    try {
        users = JSON.parse(req.body.users);
    } catch (error) {
        res.status(400);
        throw new Error("Users should be a valid JSON array");
    }

    if (users.length < 2) {
        res.status(400);
        throw new Error("Group chat needs more than 2 members");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(201).json(fullGroupChat);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});
const renameGroupChat = asyncHandler(async (req , res) => {
    const {chatId , chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {chatName},
        {new: true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!updatedChat){
        res.status(400)
        throw new Error("Chat not found")
    }else{
        res.json(updatedChat);
    }
})

const addtoGroup = asyncHandler(async (req , res) =>{
    const{ chatId , userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId , 
     {   $push: {users : userId} } , 
        {new:true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!added){
        res.status(400)
        throw new Error("Chat not found")
    }else{
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async (req , res) =>{
    const{ chatId , userId} = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId , 
     {   $pull: {users : userId} } , 
        {new:true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!removed){
        res.status(400)
        throw new Error("Chat not found")
    }else{
        res.json(removed);
    }
})

module.exports = { accessChat , fetchChats , createGroupChat , renameGroupChat , addtoGroup , removeFromGroup};
