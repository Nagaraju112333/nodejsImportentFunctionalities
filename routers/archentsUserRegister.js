const routes=(module.exports=require("express")());
const {archentsUsers}=require("../services/archentsUserRegister");
const archentsUser=require("../models/archentsUserModel");
const jwt=require("jsonwebtoken")
const app=require("../loaders/express");
const { token } = require("morgan");
const productModel=require("../models/catogeryModel");
const { json } = require("body-parser");
routes.post("/newRegister",async (req,res)=>{ 
    
   try{
    const user=await archentsUsers.newRegister(req.body);
    res.status(200).send({
        user
    })
   }
   catch(err){
    res.send("error:",err);
   }

});
routes.post("/login",async (req,res)=>{
    try{
        
        const user=await archentsUsers.userLogin(req.body);
        res.status(200).send(user);
    }
    catch(err){
        res.send(err)
    }
});
routes.get('/getUserinfo',async (req,res)=>{
    console.log(req.designation,"userRole")
    try{

        if(req.designation=="admin"){
            const  getallUsers=await archentsUsers.getAllUsersOrSingleinfo(req.id,req.designation)
            res.send(getallUsers)
        }
        else{
            const users=await archentsUsers.getAllUsersOrSingleinfo(req.id,req.designation)
            res.send(users)
        }
    } catch(err){
        console.log(err);
    }
})
//practice
routes.post("/userLogin",async (req,res)=>{
    
    try{
        const userdata=await archentsUsers.userLoginfun(req.body);
        console.log(userdata);
        res.send(userdata);

    }
    catch(err){
        return err;
    }
});
routes.get("/searchByname",async (req,res)=>{
    try{
        const namesbydata=await archentsUsers.searchByName(req.body);
        res.send(namesbydata);

    }
    catch(err){
        return err;
    }
});

routes.get("/search/:key",async (req,res)=>{
    try{
        const namewise=req.params.key;
        const serachfun=await productModel.find({
          "$or":  [
            {"name":{$regex:namewise}}
        ]
        })
        res.send(serachfun)
    }
    catch(err){
    res.send(err)
    }
});
routes.get("/getall",async (req,res)=>{
    //console.log("------------------")
  try{
    const all=await archentsUsers.getAllUsers();
   // console.log(all)
    res.send(all);
  }
  catch(err){
    res.send(err)
  }

});
routes.get("/getUserByID",async (req,res)=>{
 try{
    const getUserByid=await archentsUsers.getUserById(req.query.id);
    //console.log(getUserByid)
     res.send(getUserByid)

  }
  catch(err){
    return err;
  }

});


routes.post("/deleteUser",async (req,res)=>{
    console.log(req.body.id)
    try{
        let deleteuser=await archentsUsers.deleteByUser(req.body.id)
        console.log(deleteuser)
        res.send(deleteuser);
    }
    catch(err){
        res.send({err})
    }
});
routes.post("/updateUsers",async(req,res)=>{
    try{
        const updatee=await archentsUsers.updateUserData(req.body);
        
        res.send(updatee);

    }
    catch(err){
        return err
    }
});
routes.post("/updateuserbasedontoken", async (req,res)=>{
    try{
        console.log(req.id)
        const edituser=await archentsUsers.UpdateuserBasedOnToken(req.body);
        console.log(edituser)
        res.send(edituser);
    }
    catch(err){
        return err;
    }
});
routes.post("/userLoginWithOTP",async (req,res)=>{
    try{
        const userloginOtp=await archentsUsers.userLoginwithOtpfun(req.body);
        res.send(userloginOtp);

    }
    catch(err){
        return err;
    }
});
routes.post("/verifyOtpLogin",async (req,res)=>{
   // console.log("jkcsdjlks djksakdhsakjdhsakj")
   
    console.log(req.body.otp)
    try{
        const checkOtp=await archentsUsers.verifyOtpForLogin(req.body.otp)
        console.log(checkOtp)
         res.send(checkOtp);
    }
    catch(err){
        return err
    }
});
routes.get("/getUserDataWithLoginVerify",async (req,res)=>{
   // console.log(req.id)
    try{
        const getuseridFromToken=await archentsUsers.getuserdatafun(req.id);
        res.send(getuseridFromToken);
    }
    catch(err){
    res.send(err)
    }
})
routes.post("/forgotPassword",async(req,res)=>{
    const num=req.body.phoneNumber
    try{
        const phoneNumber=await archentsUsers.forgotPasswordfun(num);
        console.log(phoneNumber)
        res.send(phoneNumber);

    }
    catch(err){
        return err
    }
});
routes.post("/sendmail", async(req,res)=>{
    console.log(req.body.email,"email")
    try{
        const emailid = await  archentsUsers.fcnSendEmail(req.body.email)
        console.log(emailid,"routes ")
        req.send(emailid)
    }
    catch(err){
        return err
    }
})
routes.get("/dropdownList",async (req,res)=>{
    // console.log("hai")
    // const get=await archentsUser.find();
    // console.log(get,"getallemployees")
    try{
        const getAllNames = await archentsUser.find({}, 'firstName');
        if(getAllNames){
            
          const names = getAllNames.map(user => user.firstName);
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
routes.get("/getemployeeBydropDownList",async (req,res)=>{
    //console.log(req.body.name,"query")
     try{
        const getemp=await archentsUsers.getEmpdetaislByDropDownListNmaewise(req.body.name);
        //console.log(getemp,"----")
        res.send(getemp)
     }
     catch(err){
        res.send(err)
     }
});
routes.get("/matchFunction",async (req,res)=>{
    try{
        const userName=await archentsUsers.fcnGetEmployeeDataByusingMatchfucntions(req.query.name,req.query.role);
        res.send(userName);
    }
    catch(err){
        return err
    }
})
routes.get("/aggregations",async (req,res)=>{
    try{
        const data=await archentsUsers.fcnAllAggregations(req.query.name);
        res.send(data);
    }
    catch(err){
        return err
    }
})

