const router= (module.exports=require('express')())
const mongoose=require('mongoose')
const {userServices}=require('../services/userRegister');
const { error } = require('../loaders/logger');
const { routes } = require('./employeeMOdel');

router.post("/userRegisters", async function(req,res){
    console.log(req.body)
   try{
    const newuser=await userServices.userRegister(req.body);
    res.send(newuser)
   }
    catch(err){
        console.log(err);
        res.send({message:"something is wrong..."})
    }

});
router.get("/adminLogin",async(req,res)=>{
    try{
        const admindata=await userServices(req.body);
        res.send(admindata);
    }
    catch(err){
        res.send(err)
    }
})