const routes=(module.exports=require("express")())

const {newStakeHolder}=require("../services/stakeHolderModel")

routes.post("/stakeHolderRegister",async (req,res)=>{
    try{
       const register=await newStakeHolder.fcnStakeHolderRegister(req.body);
       res.send(register)
    }
     catch(err){
        res.send(err)
     }
})