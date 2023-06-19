const routes=(module.exports=require("express")())
const { data } = require("../loaders/logger");
const {archentsfunctionalities}=require("../services/ArchentsfcnModel");
const {twoFactorService}=require("../loaders/twoFactor");
const { verify } = require("crypto");
routes.post("/employeeRegitser", async(req,res)=>{
    console.log("hai")
    try{
        const newUser=await archentsfunctionalities.fcnRegister(req.body)
        if(newUser!=null){
            res.send(newUser)
        }
    }
    catch(err){
        res.send(err)

    }
});
routes.post("/Ulogin",async (req,res)=>{
    try{
        
        const login=await archentsfunctionalities.LoginFcn(req.body)
        res.send(login)
    }
    catch(err){
        res.send(err)
    }
})
routes.post("/creteNewPassword",async (req,res)=>{
    console.log("createpassword route--------------------")
    console.log(req.id,"userid")
    try{
        const newPassword=await archentsfunctionalities.fcnCreateNewPassword(req.body);
        res.send(newPassword)
    }
    catch(err){
        res.send(err)
    }
});
routes.post("/forgotPassword",async (req,res)=>{
    try{
        const number=await archentsfunctionalities.fcnforgotPassword(req.body)
        res.send(number)
    }
    catch(err){
        res.send(err)
    }
});
routes.post("/verifyOtp",async(req,res)=>{
    console.log(req.body.sid,"api sid")
    try{
       const verifyStatus=await twoFactorService.verifyOTP(req.body.sid,req.body.code)
       console.log(verifyStatus,"status details")
       if(verifyStatus.Status=="Success"){
        res.send({message:"otp verify"})
          //return ({message:"otpVerify Successfully done"})
       }
       else{
        res.send({message:"invalid otp"})
       }
        // const otp=archentsfunctionalities(req.body);
        // res.send(otp)
    }
    catch(err){
        res.send(err)
    }
})