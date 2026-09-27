const mongoose = require("mongoose");
require('dotenv').config();


mongoose.set('strictQuery', false);


mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/Blog").then(()=>{
    console.log("connected! db ");
}).catch((err)=>{
    console.log(err);
})