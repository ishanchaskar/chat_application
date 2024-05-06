const mongoose = require('mongoose');
const connectDb = async  () =>{
    try {
        const conn = await mongoose.connect("mongodb+srv://ishan_803:sprpn605@cluster0.xbjivw4.mongodb.net/chat", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            
        })
        console.log(`mongo connected ${conn.connection.host}`)
    } catch (error) {
        console.log(` error found ${error.message}`)
        process.exit();
    }
}
module.exports = connectDb;