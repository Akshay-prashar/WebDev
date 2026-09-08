const express= require("express");
const z=require("zod");
const jwt = require("jsonwebtoken");
const {User} = require("./db");
const {Task} = require("./db");
const hassFunction=require("./passwordHashing");
const bcrypt = require('bcrypt');
const authMiddleware = require("./middleware");
require("dotenv").config();
const port = process.env.PORT || 3000;
const JWT_SECRET=process.env.JWT_SECRET
const cors =require('cors')
const app=express();
app.use(cors())

app.use(express.json());

const signupSchema=z.object({
    username:z.string(),
    password:z.string().min(8)
})
app.post('/auth/signup',async(req,res)=>{
    const input = req.body
    const isValid=signupSchema.safeParse(input)
    if (!isValid.success) {
        return res.status(400).json({message:"Invalid input"})
    }
    const isDuplicate=await User.findOne({
        username:input.username
    });
    if (isDuplicate) {
        return res.status(400).json({message:"user Already Exist"})
    }
    const hassedPassword=await hassFunction(input.password)
    const createdUser=await User.create({
        username:input.username,
        password:hassedPassword,
        createdAt: Date.now()
    });
    const token=jwt.sign({username:createdUser.username,userId:createdUser._id},JWT_SECRET)
    res.status(201).json({
        message:"User Created",
        token
    })
});

const signinSchema=z.object({
    username:z.string(),
    password:z.string().min(8)
})
app.post('/auth/signin',async(req,res)=>{
    const input =req.body
    const isValidSchema=signinSchema.safeParse(input)
    if (!isValidSchema.success) {
        return res.status(400).json({message:"Invalid input"})
    }
    const user=await User.findOne({username:input.username})
    if (!user) {
        return res.status(401).json({message:"user not registered"})
    }
    const isValid=await bcrypt.compare(input.password,user.password);
    if (!isValid) {
        return res.status(401).json({message:"Invalid password"})
    }
    const token=jwt.sign({username:user.username,userId:user._id},JWT_SECRET);
    res.status(200).json({message:"Login sucessful",token})
})

const taskSchema=z.object({
    task:z.string().min(10)
})
app.post('/tasks',authMiddleware,async(req,res)=>{
    const input=req.body
    const isValid= taskSchema.safeParse(input);
    if (!isValid.success) {
        return res.status(400).json({message:"Task is invalid or to small"});
    }
    const isDuplicate=await Task.findOne({userId:req.userId,task:input.task,})
    if (isDuplicate) {
        return res.status(400).json({message:"Task already exist"});
    }
    await Task.create({
        userId:req.userId,
        task:input.task,
        completed:false,
        createdAt:Date.now(),
        updatedAt:Date.now()
    });
    res.status(201).json({message:"Task added"})
})

app.get('/tasks',authMiddleware,async(req,res)=>{
    const tasks=await Task.find({userId:req.userId});
    res.status(200).json({
        tasks : tasks.map(e=> ({
            id:e._id,
            task:e.task,
            completed:e.completed
        }))
    })
})

app.delete('/tasks/:taskId',authMiddleware,async(req,res)=>{
    const input=req.params.taskId;
    console.log(input);
    const isValid =await Task.findOne({
        userId:req.userId,
        _id:input
    });
    if (!isValid) {
        return res.status(404).json({message:"Request not possible"});
    }
    await Task.findOneAndDelete({
        userId:req.userId,
        _id:input
    });
    res.status(200).json({message:"Task deleted"})
});

const putSchema=z.object({
    task:z.string().min(10)
})
app.put('/tasks/:taskId',authMiddleware,async(req,res)=>{
    const input=req.params.taskId;
    const inputBody=req.body;
    const isValidSchema=putSchema.safeParse(inputBody)
    if (!isValidSchema.success) {
        return res.status(400).json({message:"Task is blank or to small"})
    }
    const isValid =await Task.findOne({
        userId:req.userId,
        _id:input
    });
    if (!isValid) {
        return res.status(404).json({message:"Request not possible"});
    }
    await Task.findOneAndUpdate({
        userId:req.userId,
        _id:input
    },{
        task:inputBody.task,
        updatedAt:Date.now()
    })
    res.status(200).json({message:"Task updated"})
})

app.use((err,req,res,next)=>{
    res.status(400).json({message:"error!",error:err})
})
app.listen(port,()=>{
    console.log("App running on http://localhost:" ,port);
    
})
