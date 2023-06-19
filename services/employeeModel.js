const routes=require("express");
const {hasher}=require("../lib/hasher");
const employeeModels=require("../models/employeeModel");
const nodemailer=require("nodemailer");
const { has } = require("underscore");
const approvalModel=require("../models/adminApprovals");
const { fromString } = require("uuidv4");
const { crossOriginResourcePolicy } = require("helmet");
const generateTokens=require("../lib/generateToken")
const _=require("underscore")

async function fcnRegister(data){
    try{
        const checkEmilExsit=await employeeModels.findOne({email:data.email});
        if(checkEmilExsit!=null){
         return {message:"email already Exsit"}
        }
        else{
        //     const allamdins=await employeeModels.find();
        //    // console.log(allamdins,"alladmins data")
        //     const getadminrole=await employeeModels.findOne({role:allamdins.role})
        //     console.log(getadminrole.role,"getadminrolewisedata")
            const user=await employeeModels({
             firstName:data.firstName,
             lastName:data.lastName,
             gender:data.gender,
             email:data.email,
             password:await hasher.passwordHasher(data.password),
             phoneNumber:data.phoneNumber,
             role:"employee",
             isAccepted:false
           }) 
          await user.save();
                    const getallemployees=await employeeModels.find({role:"admin"});
                    console.log("getAllUsers",getallemployees)
                    console.log(getallemployees.length)
                    const loginlink="http://0.0.0.0:8002/adminLogin";
                    for (let i = 0; i <getallemployees.length; i++) {
                        
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                            user: 'support.tickets@archents.com',
                            pass: 'dxeetecfvulpvnck'
                            }
                            });
                            console.log("{yhnjmk,lkmjhgvbhnjk")
                            const mailOptions = {
                            from: 'support.tickets@archents.com',
                            to: getallemployees[i].email,
                            subject: 'approval notification',
                            text: 'name: '+getallemployees[i].firstName+" "+getallemployees[i].lastName+"need to approval for registation   "+"please Login the bellow The link "+loginlink
                            }; 
                            transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.error(error);
                            } else {
                            console.log('Email sent: ' + info.response);
                             }
                          });

                      }
                      // save employee details approvalschema
                    
         return {message:"approval mail send successfully sent to admins mails"}
        }
    }
    catch(err){
       return err
    }
 
 }
 async function fcnAdminLogin(data){
    console.log(data.email,"functionality")
    try{
        const checkEmailExsit=await employeeModels.findOne({email:data.email})
        console.log(checkEmailExsit)
        if(checkEmailExsit==null){
            return {message:"email does not exsit"} 
        }
        else{
            console.log("else part")
            //return {message:"no notification"};
            if(checkEmailExsit.role=="admin"){
               const getallEmployeess=await employeeModels.find({role:"employee"},{isAccepted:false});
               //const checkisActive=await employeeModels.find({isAccepted:"true"})
               if(getallEmployeess!=undefined){
                console.log(getallEmployeess)
                  return getallEmployeess
               }
               else{
                return {message:"no notification "}
               }
            }
            else{
                if(checkEmailExsit.isAccepted==true){
                 return checkEmailExsit
                }
                else{
                   return {message:"admin not accepted your Request..."}
                }
            }
        }
    }
    catch(err){
        return err
    }
 }
 async function fcnAdminAcceptRequest(data) {
 try
 {
    console.log(data.adminAcceptance[0].email,"data.email")
      if(data!=null){
         var checkEmailId=await approvalModel.findOne({adminAcceptance:{$elemMatch:{email:data.adminAcceptance[0].email}}});
         console.log(checkEmailId,"checkUserexsit")
         if(checkEmailId==null){
            let approved = await approvalModel.findOneAndUpdate(
                {
                  employeeId: data._id,
                 // name: data.firstName,
                },
                {
                  $push: { adminAcceptance:data.adminAcceptance[0]},
                },
                { upsert: true, new: true }
              );
              if(approved.adminAcceptance.length==2){
                const isverifyTrue = await employeeModels.findOneAndUpdate(
                    { _id: data._id },
                    { $set: {isAccepted:true } }
                  );
                 
              }
              return {message:"accepted successfull"}
              //console.log(approved,"approved---")
             
             
         }
         else{
            return {message:"already accepted"}
         }
      }
 }
 catch(err)
 {
    return err
 }
    
 }
// approval
// async function fcnApproval(data){
//    try{
//        const checkEmilExsit=await employeeModels.findOne({email:data.email});
//        if(checkEmilExsit!=null){
//         return {message:"email already Exsit"}
//        }
//        else{
//           const user=await employeeModels({
//             firstName:data.firstName,
//             lastName:data.lastName,
//             gender:data.gender,
//             email:data.email,
//             password:data.password,
//             phoneNumber:data.phoneNumber,
//             admin1:null,
//             admin2:null,
//             role:"employee"
//           });
//           await user.save();
//           const getadminrole=await employeeModels.find();
//           const admin=await employeeModels.findOne({role:getadminrole.role})
//           console.log(admin.role)
//           const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//             user: 'support.tickets@archents.com',
//             pass: 'dxeetecfvulpvnck'
//             }
//             });
//             const mailOptions = {
//             from: 'support.tickets@archents.com',
//             to: data.email,
//             subject: 'Email Subject',
//             text: 'OTP : '+randomOTP
//             };
//             transporter.sendMail(mailOptions, function(error, info) {
//             if (error) {
//                 console.error(error);
//             } else {
//             console.log('Email sent: ' + info.response);
//              }
//             });
//           return {message:"successfull sent to approval message to admins"}
//        }
//    }
//    catch(err){
//       return err
//    }
//}


async function registerWithAdmin(data){
    console.log("hai","this is function")
    try{
        console.log(data);
        const checkEmilExsit=await employeeModels.findOne({email:data.email});
        console.log(checkEmilExsit,"jndkjsdhskj")
        if(checkEmilExsit!=null){
         return {message:"email already Exsit"}
        }
        else{
        const adminData=await employeeModels.findOne({email:data.adminEmail})
         console.log(adminData._id,"getAdminId")
            const user=await employeeModels({
             firstName:data.firstName,
             lastName:data.lastName,
             email:data.email,
             password:await hasher.passwordHasher(data.password),
             phoneNumber:data.phoneNumber,
             role:"employee",
             isAccepted:false,
             admin_Id:adminData._id
           }) 
           console.log(user,"user saved data")
           await user.save();
        }
       
         // await user.save();
          return ({message:"user register successfully done"})
    }
    catch(err){
        return err
    }
}
async function fcnLogin(data){
    try{
        const emailExists=await employeeModels.findOne({email:data.email});
        console.log(emailExists,"userdetais")
        if(emailExists!=null){
            if(
                await hasher.comparePassword(data.password, emailExists.password)
            )
             if(emailExists.role=="admin"){
                {
                    let token = await generateTokens(
                        emailExists._id,
                        emailExists.firstName,
                        emailExists.role,
                        //checkUserExist.designation
                      );
                      console.log(token)
                      return {
                        token: token,
                        user: await _.pick(emailExists, ["firstName", "_id", "role"]),
                      }
                }
            

               
             }
             else{
                return emailExists
             }
        }
        else{
            return ({message:"invalid userName or password"})
        }
    }
    catch(err){
        return err
    }
}
async function getAssingnedEmp(id){
    try{
        const getemp=await employeeModels.find({admin_Id:id});
        console.log(getemp,"getrequestemp")
        if(getemp!=undefined){
            return getemp
        }
        else{
            return ({message:"no records"})
        }
    }
    catch(err){
        return err
    }
}
async function getSingleUserInfo(empId,id){
   
    try{
        console.log(id,empId)
        const getUserDetails=await employeeModels.findOne({_id:empId,admin_Id:id});
       // console.log(getUserDetails,"getsingleuser")
        return getUserDetails;
    }
    catch(err){
        return err
    }
}
// async function fcnsortAllfunctions(data){
//     try{
//         const userdata=await employeeModels.fi
//     }
// }
exports.allEmployeeModelFcn={
    fcnRegister:fcnRegister,
    fcnAdminLogin:fcnAdminLogin,
    fcnAdminAcceptRequest:fcnAdminAcceptRequest,
    registerWithAdmin:registerWithAdmin,
    fcnLogin:fcnLogin,
    getAssingnedEmp:getAssingnedEmp,
    getSingleUserInfo:getSingleUserInfo
}