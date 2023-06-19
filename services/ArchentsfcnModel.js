const archentsfcnModel=require("../models/ArchentsfcnModel");
const {hasher}=require("../lib/hasher");
const { error } = require("../loaders/logger");
//const MailMessage = require("nodemailer/lib/mailer/mail-message");
const nodemailer=require("nodemailer");
const _=require("underscore")
const generateTokens=require("../lib/generateToken")
const {twoFactorService}=require("../loaders/twoFactor")

async function fcnRegister(data){
    try{
        var randamPassword  = Math.random().toString(36).slice(-8);
        const checkEmailExsist=await archentsfcnModel.findOne({email:data.email});
       console.log(checkEmailExsist,"checkUserexsitsor not")
        if(checkEmailExsist!=null){
           return ({message:"email already exsist"})
        }
        else{
          let newUser=await archentsfcnModel({
             firstName:data.firstName,
             lastName:data.lastName,
             designation:data.designation,
             phoneNumber:data.phoneNumber,
             email:data.email,
             password:await hasher.passwordHasher(randamPassword),
             profileImage:data.profileImage,
             createPassword:false
          })
          await newUser.save();
          
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
            subject: 'Password',
            text: "Your Password is  "+ randamPassword
            }; 
            transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
            } else {
            console.log('Email sent: ' + info.response);
             }
          });
            return({message:"userRegister SuccessFully done and password sent to  "+data.email}) 
        }
    }
    catch(err){
        return error;
    }

}
async function LoginFcn(data){
    try{
        const checkemail=await archentsfcnModel.findOne({email:data.email})
        console.log(checkemail,"email")
        if(checkemail!=null){
            (
                await  hasher.comparePassword(data.password,checkemail.password)
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
                    user: await _.pick(checkemail, ["firstName", "_id", "role","createPassword"]),
                  }
            }
        }
        else{
            return ({message:"email does't exsit"})
        }

    }
    catch(err){
        return err;
    }
}
async function fcnCreateNewPassword(data)
{
    
     try{
        if(!data.password ||!data.confirmPassword){
            return ({message:"password and confirm password require"})
        }
        if(data.password!==data.confirmPassword){
            return ({message:"password and confirm password not match"})
        }
      const passwordhash=await hasher.passwordHasher(data.password)
        //const match=await archentsfcnModel.findOne({_id:data.id});
        await archentsfcnModel.findOneAndUpdate({_id:data.id},{$set:{createPassword:true,password:passwordhash}})
        return ({message:"success"})
     }
     catch(err){
      return err
     }
}
async function fcnforgotPassword(number){
    try{
        const checkPhoneNumber=await archentsfcnModel.findOne({phoneNumber:number});
        if(checkPhoneNumber!=null){

            let verification = await twoFactorService.sendOTP(number);
            await archentsfcnModel.findOneAndUpdate({phoneNumber:number},{$set:{createPassword:true,password:passwordhash}})
            console.log(verification)
            return {
              errors: "",
              verificationStatus: verification.Status,
              verificationSID: verification.Details,
            };
          
        }
    }
    catch(err){
        return err
    }
}
// async function fcnVerify(data){
//     try{
//        if(data!=null){
//         await twoFactorService.verifyOTP({})
//        }
//     }
//     catch(err){
//         return err
//     }
// }
exports.archentsfunctionalities={
    fcnRegister:fcnRegister,
    LoginFcn:LoginFcn,
    fcnCreateNewPassword:fcnCreateNewPassword,
    fcnforgotPassword:fcnforgotPassword
}
