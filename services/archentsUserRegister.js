const routes=require("express");
const {hasher}=require("../lib/hasher");
const archentsUser=require("../models/archentsUserModel");
const { random } = require("underscore");
const nodemailer=require("nodemailer");
const generateTokens=require("../lib/generateToken")
const { twoFactorService } = require("../loaders/twoFactor");
const jwt=require("../loaders/jwt")
const _=require("underscore")
const crypto=require("crypto");
const { send } = require("process");
const { json } = require("body-parser");
const { arch } = require("os");

const {emailService}=require("../loaders/configu");
const archentsUserRegister = require("../routers/archentsUserRegister");



async function newRegister(data){
    console.log(data.email)
    try{
        let checkEmailorphoneNumberExsit=await archentsUser.findOne({
          email:data.email
        })
        var randomOTP = await Math.floor(100000 + Math.random() * 900000);
         // createing ramdam password 
        // function generateRandomPassword(length) {
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        //     const characterCount = characters.length;
          
        //     let password = '';
        //     for (let i = 0; i < length; i++) {
        //       const randomIndex = crypto.randomInt(0, characterCount);
        //       password += characters[randomIndex];
        //     }
        //     return password;
        //   }
        //   const randomPassword = generateRandomPassword(10);
        //   console.log(randomPassword);

        //console.log(checkEmailorphoneNumberExsit,"---------------------------")
        if(checkEmailorphoneNumberExsit==null){
            const user=new archentsUser({
                firstName:data.firstName,
                lastName:data.lastName,
                gender:data.gender,
                email:data.email,
                phoneNumber:data.phoneNumber,
                password:await hasher.passwordHasher(data.password),
                role:"Employee",
                firstRegister:0
            })
            await user.save();
            // Create a transporter with your email service credentials
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'support.tickets@archents.com',
            pass: 'dxeetecfvulpvnck'
            }
            });
            const mailOptions = {
            from: 'support.tickets@archents.com',
            to: data.email,
            subject: 'Email Subject',
            text: 'OTP : '+randomOTP
            };
            transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
            } else {
            console.log('Email sent: ' + info.response);
             }
            });
        return "userRegister SuccessFully done and password sent to"+data.email
        }
        else{
            return "email already Exsist..."
        }

    }
    catch(err){
        return err
    }
}

  // user login functionality
  async function userLogin(data){
 try{
     const checkemail=await archentsUser.findOne({
        email:data.email
     });
     console.log(checkemail);
     if(checkemail==null){
        return ({message:"invalid email or password"})
     }
     else{
        if(
            await hasher.comparePassword(data.password, checkemail.password)
        )
        {
        let token = await generateTokens(
            checkemail._id,
            checkemail.firstName,
            checkemail.role,
            //checkUserExist.designation
          );
          console.log(token)
          return {
            token: token,
            user: await _.pick(checkemail, ["firstName", "_id", "role"]),
          };
        }
        
     }
 }
        catch(err){
            return err
        }
  }
  async function userLoginfun(data){
    try{
        const checkuserExist=await archentsUser.findOne({
        email:data.email
        })
        console.log(checkuserExist)
        if(checkuserExist==null){

         return "user not found With"+data.email  
        }
        else{
             if(
             await hasher.comparePassword(data.password,checkuserExist.password)
             )
             {
                return  checkuserExist

             }
             else{
               return ({message:"invalid userName And password"})
             }
        }
    }
    catch(err)
    {
        return err;
    }
  }
 async function searchByName(data){
    try{
        const names=await archentsUser.find({firstName:data.firstName})
        console.log(names._id);
        console.log(names)
        const name=await archentsUser.filter((user)=>{
            return user.firstName.toLowerCase().includes(data.toLowerCase());
        });
        console.log(name)
        if(names!=undefined){
            //console.log("-------",names)
            return send(names);
        }
        else{
            return send({message:"no records not found"})
        }
    }
    catch(err){
        return err;
    }
 }
 // getell user details
 async function getAllUsers(){
   try{
    const getAll=await archentsUser.find().limit(5);
    return getAll;
   }
   catch(err){
    return err;
   }
 }
 //getUser by id
 async function getUserById(id){
    try{
        const userinfo=await archentsUser.findOne({_id:id})
        return userinfo;
    }
    catch(err){
        return send({err})
    }

 }
 // delete user by id
 async function deleteByUser(id){
    try{
        console.log(id);
        const checkid=await archentsUser.findOne({_id:id});
        if(checkid==null){
            return {message: "no record not found with:" + id + ""}
        }
        else{
         await archentsUser.deleteOne({_id:id})
            return {message:"recored deleted successfully done.. "}
        }
       
    }
    catch(err){
        return err
    }
 }
//update user details based on token  uesId
async function UpdateuserBasedOnToken(data){
    console.log(data.id)
    try{
        const userid=await archentsUser.findOne({_id:data.id})
        if(userid==null){

        }
        else{
            await archentsUser.updateOne({_id:data.id},{$set:{firstName:data.firstName,lastName:data.lastName}})
            return {message:"user update succesfully.."}
        }
        console.log(userid)
    }
    catch(err){
        return err;
    }
}

 async function updateUserData(data){
   try{
    const checkuser=await archentsUser.findOne({_id:data.id});
    console.log(checkuser)
      if(checkuser==null){
        return {message:"no records found with id"+data.id}
      }
      else{
         await archentsUser.updateOne({_id:data.id},{$set:{firstName:data.firstName,lastName:data.lastName}})
         return {message:"user update succesfully.."}
      }
   }
   catch(err){
    return err
   }
 }
 async function userLoginwithOtpfun(data){
    try{
        console.log(data.email,"user email")
        const checkmeilid=await archentsUser.findOne({
           email:data.email
        });
      console.log(checkmeilid,"check emnailexist or not")
        if(checkmeilid==null){
            return "email does not exist"
        }

        else{
             if(
                await hasher.comparePassword(data.password,checkmeilid.password)
             )
             {
                var LoginVerify= await Math.floor(100000 + Math.random() * 900000);
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'support.tickets@archents.com',
                    pass: 'dxeetecfvulpvnck'
                    }
                    });
                    const mailOptions = {
                    from: 'support.tickets@archents.com',
                    to: data.email,
                    subject:'Verification OTP',
                    text: 'OTP : '+LoginVerify
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.error(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                     }
                    });
                    // const addOtpindocument=await archentsUser.findOne({_id:checkmeilid.id})
                    // console.log(addOtpindocument)
                    // const saveotp=new  archentsUser(
                    //     addOtpindocument.otp=LoginVerify

                    // );
                     const saveotp= await archentsUser.updateOne({_id:checkmeilid.id},{$set:{otp:LoginVerify}})
                    // await saveotp.save();
                  return {message:"verification otp sent to your emailId"}
             }
             else{
                return {message:"invalid email or password"}
             }
        }
    }
    catch(err){
        return err;
    }
 }
 // verify otp for login user
 async function verifyOtpForLogin(otp){
   // console.log(otp,"otp is")
    const dbotp=otp; 
    try{
        const ccheckotp=await archentsUser.findOne({otp:dbotp})
       //  console.log(ccheckotp,"getuserid");
        if(ccheckotp==null){
            return {message:"please enter  valid otp"}
        }
        else{
            
            const saveotpnull= await archentsUser.findByIdAndUpdate({_id:ccheckotp._id},{$set:{otp:null}})
           // console.log(saveotpnull)
            //await saveotpnull.save();
            let gettoken=await generateTokens(
                ccheckotp._id,
                ccheckotp.firstName,
                ccheckotp.role
            )
            console.log(gettoken)
            return {
                gettoken: gettoken,
                user: await _.pick(ccheckotp, ["firstName", "_id", "role"]),
              };

        }
    }
    catch(err){
        return err
    }
 }
 async function getuserdatafun(userId){
    try{
        const userDetails=await archentsUser.findOne({_id:userId});
        return {
             firstName:userDetails.firstName,
             lastName:userDetails.lastName,
             email:userDetails.email,
             phoneNumber:userDetails.phoneNumber
        };
    }
    catch(err){
         return err;
    }
 }
 async function  getAllUsersOrSingleinfo(id,role){
    try{
        if(role=="admin")
        {
            const getallUsers=await archentsUser.find();
            return getallUsers
        }
        
        else{
            const getUserinfo=await archentsUser.findOne({_id:id})
            return getUserinfo;
        }
        
    }
    catch(err){
        return err
    }
 }
 async function forgotPasswordfun(number){
    try{
        console.log(number)
        const checkNumberExsit=await archentsUser.findOne({phoneNumber:number});
        console.log(checkNumberExsit)
        if(checkNumberExsit==null){
            return {message:"phoneNumber Does Not Exist"}
        }
    
        else{
            let verification = await twoFactorService.sendOTP(number);
            console.log(verification)
            return {
              errors: "",
              verificationStatus: verification.Status,
              verificationSID: verification.Details,
            };
        }
    }
    catch(err){
        return err;
    }
 }
 async function fcnSendEmail(email){
    console.log(email,"service EMail")
    try{
        const checkemailid=await archentsUser.findOne({email:email})
        console.log(checkemailid,"checkemailid")
        if(checkemailid==null){
            return {message:"email not found"}
        }
        else{
         const emailsoso=await emailService.sendEmail(checkemailid.email,checkemailid.firstName,checkemailid.lastName)
          console.log(emailsoso,"emailsuccess")
           return {message:"success.."}
        }
    }
    catch(err){
    }
 }
 
 async function getEmpdetaislByDropDownListNmaewise(name){
    try{
        const getempinfo=await archentsUser.findOne({firstName:name})
        const getDetails=new archentsUser({
           firstName:getempinfo.firstName,
           lastName:getempinfo.lastName,
           gender:getempinfo.gender,
           email:getempinfo.email,
           phoneNumber:getempinfo.phoneNumber
        })
        //console.log(getDetails)
        return getDetails;
    }
    catch(err){
        return err
    }
 }
 async function fcnGetEmployeeDataByusingMatchfucntions (name,role){
    try{
        console.log("if condition")
        if(name!=null){
    //  const userdata1=await archentsUser.aggregate([{$match:{firstName:name,role:role}},
    //   {$project:{_id:1,lastName:1,gender:1,email:1,firstName:1,role:1,phoneNumber:1}}]);
            // console.log(userdata,"userdata")

            // count employee based on  designations
           // const userdata=await archentsUser.aggregate([{$group:{_id:"$role",totalemployees:{$sum:1}}}])
            // grouping employee details based on role
           const userdata=await archentsUser.aggregate([
           {$match:{gender:name}},
             {$group:{_id:"$role",totalEmployees:{$sum:1}}}
         ])

       // sorting employee Details by using firsName
        // let userdata=await archentsUser.aggregate([
        //     {$match:{gender:gender}},
        //     {$sort:{firstName:1}}
        // ])
        //Sort Groupped Data
    //   let userdata =await archentsUser.aggregate([
    //     {$match:{gender:gender}},
    //     {$group:{_id:"$role",Totdalemployees:{$sum:1}}},
    //     {$sort:{firstName:1}}
    //   ])

            console.log(userdata,"userdata")
            return userdata;
        }
        else{
            return ({message:"please pass Name"})
        }

    }
    catch(err){
         return err
    }
 }
 async function fcnAllAggregations(name){

    try{
         if(name!=null){
        //   const users=await archentsUser.aggregate([
        //     {$match:{gender:gender}},
        //     {$sort:{lastName:1}}
        //   ])
        // const users=await archentsUser.aggregate([
        //     {$group:{_id:"$role",totalEmployees:{$sum:1}}}
        // ])


        //sort
        // const users=await archentsUser.aggregate([
        //     {$match:{gender:name}},
        //     {$sort:{firstName:1}}
        // ])
        //groupedBy sort
        const users=await archentsUser.aggregate([
            {$match:{gender:name}},
            {$group:{_id:"$role",totalEmployees:{$sum:1}}},
            //{$sort:{firstName:1}}
        ])
           console.log(users,"userData")
            return users
         }
    }
    catch(err){
        return err
    }
 }
exports.archentsUsers={
newRegister:newRegister,
userLogin:userLogin,
userLoginfun:userLoginfun,
searchByName:searchByName,
getAllUsers:getAllUsers,
getUserById:getUserById,
deleteByUser:deleteByUser,
updateUserData:updateUserData,
UpdateuserBasedOnToken:UpdateuserBasedOnToken,
userLoginwithOtpfun:userLoginwithOtpfun,
verifyOtpForLogin:verifyOtpForLogin,
getuserdatafun:getuserdatafun,
getAllUsersOrSingleinfo:getAllUsersOrSingleinfo,
forgotPasswordfun:forgotPasswordfun,
fcnSendEmail:fcnSendEmail,
getEmpdetaislByDropDownListNmaewise:getEmpdetaislByDropDownListNmaewise,
fcnGetEmployeeDataByusingMatchfucntions:fcnGetEmployeeDataByusingMatchfucntions,
fcnAllAggregations:fcnAllAggregations
}
