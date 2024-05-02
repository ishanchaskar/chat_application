const mongoose = require('mongoose');
const userModel = mongoose.Schema({
    name : {type: String , required: true},
    email : {type: String , required: true},
    password : {type: String , required: true},
    pic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
},
{
    timestamp:true,
})

const Message = mongoose.model("Message", userModel);
module.exports = Message;