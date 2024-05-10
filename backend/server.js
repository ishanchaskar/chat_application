const express = require("express");
const userRoutes = require("./routes/userRoutes")
const {chats }=  require("./data/data")
const dotenv = require("dotenv");
const app = express();
app.use(express.json())
const connectDb = require("./config/db")
app.get("/", (req, res) => {
    res.send("api is running");
})
app.use("/api/user" , userRoutes)
dotenv.config();
connectDb()

const PORT = process.env.PORT || 5000



app.listen(PORT , console.log(`server listening on port ${PORT}`));