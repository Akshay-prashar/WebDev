const mongoose = require("mongoose");
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI);

const user = new mongoose.Schema({
    username:{type: String,unique:true,required:true},
    password:{type: String,required:true},
    createdAt:Date
});

const task =new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task:{type: String,required:true},
    completed:Boolean,
    createdAt:Date,
    updatedAt:Date
})

const User =mongoose.model("User",user)
const Task = mongoose.model("Task",task)

module.exports ={User,Task}