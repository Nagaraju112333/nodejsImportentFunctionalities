const routes=(module.exports=require("express")());
const { contains } = require("underscore");
const {allEmployeeModelFcn}=require("../services/employeeModel");
const employeeMOdel=require("../models/employeeModel")
const { createPublicKey } = require("crypto");
const { route } = require("./archentsUserRegister");

routes.post("/newRegitser",async(req,res)=>{
    console.log("----hai")
    try{
        const newUser=await allEmployeeModelFcn.fcnRegister(req.body);
     res.send(newUser)
    }
    catch(err){
        res.send(err)
    }
    
});
routes.post("/adminLogin",async(req,res)=>{
    console.log(req.body.email,"route emailId")
    try{
          const adminLogin=await allEmployeeModelFcn.fcnAdminLogin(req.body);
          res.send(adminLogin)
    }
    catch(err){
        res.send(err)
     }
});
routes.post("/adminApproval",async (req,res)=>{
    try{
             
        console.log(req.body,"route")
        const approvalforaRegister=await allEmployeeModelFcn.fcnAdminAcceptRequest(req.body)
        res.send(approvalforaRegister)
    }
    catch(err){
        res.send(err)
    }
})
routes.get("/getAdminEmails",async (req,res)=>{
    // console.log("hai")
    // const get=await archentsUser.find();
    // console.log(get,"getallemployees")
    try{
        const allEmails = await employeeMOdel.find({}, 'email');
        if(allEmails){
            
          const names = allEmails.map(user => user.email);
          res.send(names)
        }
        else{
         return ({message:"no records"})
        }  
    }
    catch(err){
        return err
    }
});
routes.post("/regitserUserWithadminid",async(req,res)=>{
    console.log("Hai")
    try{
        const newUser=await allEmployeeModelFcn.registerWithAdmin(req.body);
        res.send(newUser)
    }
    catch(err){
        return err;
    }
});
routes.post("/loginemp",async (req,res)=>{
    console.log(req.body,"loginpage")
    try{
        const userlogin=await allEmployeeModelFcn.fcnLogin(req.body)
        res.send(userlogin);
    }
    catch(err){
      res.send(err)
    }
})
routes.get("/getAssignedEmp",async (req,res)=>{
     console.log(req.id,"adminid");
   try{
     const getAdminId=await allEmployeeModelFcn.getAssingnedEmp(req.id)
     res.send(getAdminId)
   }
   catch(err){
    res.send(err)
   }
})

routes.get("/getUserDetails",async(req,res)=>{
   console.log(req.query.empid,"employeeId");
   console.log(req.id,"adminId")

    //console.log(req.query.id)
    try{
        const user=await allEmployeeModelFcn.getSingleUserInfo(req.query.empid,req.id);
        res.send(user)
    }
    catch(err){
        res.send(err)
    }
})
// routes.post("/adminApproval", async (req,res)=>{
//     try{
//         const newUser=await allEmployeeModelFcn.fcnRegister(req.body);
//      res.send(newUser)
//     }
//     catch(err){
//         res.send(err)
//     }
// })