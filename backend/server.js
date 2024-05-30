const express = require("express");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const {chats }=  require("./data/data")
const dotenv = require("dotenv");
const app = express();
const {notFound , errorHandler} = require("./middleware/errorMiddleware")
app.use(express.json())
const connectDb = require("./config/db")
app.get("/", (req, res) => {
    res.send("api is running");
})
app.use("/api/user" , userRoutes)
app.use("/api/chats" , chatRoutes)

app.use(notFound)
app.use(errorHandler)

dotenv.config();
connectDb()

const PORT = process.env.PORT || 5000



app.listen(PORT , console.log(`server listening on port ${PORT}`));