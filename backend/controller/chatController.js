const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel")
const User = require("../models/userModel")
require('dotenv').config(); // Load environment variables
const accessChat =asyncHandler(async (req , res ) =>{
    const {userId} = req.body
    if(!userId){
        console.log("user id not found")
        return res.sendStatus(402);
    }

    var isChat = await Chat.find({
        isGroupChat: false ,
        $and:[
            {users : {$elemMatch : {$eq: req.user._id}}},
            {users : {$elemMatch : {$eq: userId}}},
        ]
    }).populate("users" , "-password").populate("latestMessage");
    isChat = await User.populate(isChat , {
        path: 'latestMessage.sender',
        select: "name pic email",
    })
    if(isChat.lenght > 0){
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName : 'sender',
            isGroupChat : false,
            user : [req.user._id , userId]
        }
    }
    try {
        const createdChat = await Chat.create(chatData)
        const FullChat = await Chat.findOne({_id : createdChat._id}).populate("users" , "-password")
        res.status(402).send(FullChat)
    } catch (error) {
        res.status(402)
        throw new Error(error.message)
    }
})
// const fetchChat = asyncHandler(async (req , res) => {
//     const chats  = await Chat.findBy({})
// })

module.exports = { accessChat}