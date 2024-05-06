const express = require("express");
const {chats }=  require("./data/data")
const dotenv = require("dotenv");
const app = express();
const connectDb = require("./config/db")
app.get("/", (req, res) => {
    res.send("api is running");
})
dotenv.config();
connectDb()
app.get("/api/chat" , (req, res) => {
    res.send(chats)
})
const PORT = process.env.PORT || 5000

app.get("/api/chat/:id" , (req, res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

app.listen(PORT , console.log(`server listening on port ${PORT}`));