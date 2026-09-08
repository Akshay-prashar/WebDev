const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_SECRET=process.env.JWT_SECRET
function authMiddleware(req,res,next) {
    const input=req.headers.authorization

    if (!input) {
        return res.status(401).json({message:"Blank Token"})
    }
    const [type,token]=input.trim().split(/\s+/);
    
    if (type !== "Bearer" || !token) {
        return res.status(401).json({message:"Token Not avilable"})
    }
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if (err) {
            return res.status(401).json({message:"Invalid Token"});
        }
        req.username=payload.username;
        req.userId=payload.userId;
        next()
    })
}
module.exports=authMiddleware