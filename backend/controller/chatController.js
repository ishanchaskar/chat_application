const asyncHandler = require('asyncHandler');
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
})