require('dotenv').config();
const express = require("express");
const { protect } = require("./middleware/authMiddleware");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const connectDb = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
connectDb();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Corrected socket.io setup
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup" , (userData) => {
    socket.join(userData._id);
    socket.emit("connected")
  })

  socket.on("join chat" , (room) =>{
    socket.join(room)
    console.log(room)
  })

  socket.on("new message" , (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if(!chat.users) return console.log("chat.users not defined")
    chat.users.forEach((user) =>{
  if(user._id == newMessageRecieved.sender._id) return;
  socket.in(user._id).emit("message recieved" , newMessageRecieved);
    })
  })
});
