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
    try {
        await db.$transaction(async(tx)=>{
            const transactions= await tx.$queryRaw<{id:number,amount:number,userId:number,status:string}[]>`
            SELECT "id","userId","amount","status" 
            FROM "onRampTransaction" 
            WHERE "token"=${paymentinformation.token} 
            FOR UPDATE;`
            const transaction=transactions[0];

            if (!transaction) {
                throw new Error("Transaction not found")
            }
            if (transaction.status!=="Processing") {
                throw new Error("Transaction already processed");
            }
            if (transaction.userId!==Number(paymentinformation.userId) || transaction.amount!==Number(paymentinformation.amount)) {
                throw new Error("Invalid payment information");
            }

            await tx.balance.update({
                where:{
                    userId:transaction.userId,
                },
                data:{
                    amount:{
                        increment:transaction.amount
                    }
                }
            });
            await tx.onRampTransaction.update({
                where:{
                    id:transaction.id
                },
                data:{
                    status:"Success"
                }
            });
        },{maxWait:10000,timeout:20000});

        return res.status(200).json({
            message: "Captured",
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Failed"
        })
    }
});

app.listen(3001)