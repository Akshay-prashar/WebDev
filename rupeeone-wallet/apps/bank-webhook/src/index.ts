import express from 'express'
import db from '@repo/db'
const app=express()
app.use(express.json())

app.post("/hdfcWebhook",async(req,res)=>{
    const paymentinformation={
        token:req.body.token,
        userId:req.body.userId,
        amount:req.body.amount
    }
    const isvalidtoken=await db.onRampTransaction.findUnique({
        where:{
            token:paymentinformation.token
        },select:{
            status:true
        }
    })
    if (isvalidtoken?.status!=="Processing") {
        res.status(411).json({
            message:"Invalid Request"
        })
    }
    try {
        await db.$transaction([
            db.balance.update({
                where:{
                    userId:paymentinformation.userId
                },
                data:{
                    amount:{
                        increment:paymentinformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where:{
                    token:paymentinformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ],{maxWait:10000,timeout:20000})
        res.status(200).json({msg:"Captured"})
    } catch (error) {
        console.log(error)
        res.status(411).json({msg:"Failded"})
        
    }
})

app.listen(3001)