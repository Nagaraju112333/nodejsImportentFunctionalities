const express=require("express");
const empDeptModel=require("../models/empDeptModel");
const {hasher}=require("../lib/hasher");
const { forEach, functions } = require("underscore");
const generateToken=require("../loaders/jwt");
const { getData } = require("ajv/dist/compile/validate");
async function fcnEmpRegister(data){
       let findLastSerialNumber=await empDeptModel.find().sort({ _id:-1}).limit(1)
       console.log(findLastSerialNumber,"last _id ")
    try{
        let counter = 0;
        function generateSequenceNumber() {
        
          counter++;
          return counter;
        }
        console.log(generateSequenceNumber(),"randma Number")
        const checkEmailexist=await  empDeptModel.findOne({email:data.email});
        for (let i= 0; i <data.employeee.length; i++) {
          data.employeee[i].serialNumber=generateSequenceNumber();
          }
        if(checkEmailexist==null){
          let newEmployee=await empDeptModel({
             name:data.name,
             gender:data.gender,
             phoneNumber:data.phoneNumber,
             email:data.email,
             password:await hasher.passwordHasher(data.password),
             employeee:data.employeee
          });
            await newEmployee.save();
            return ({message:"userRegister successfully done"})
        }
        else{
        return ({message:"email already exsit"})
        }
    }
    catch(err){
         return err
    }
}
// async function fcnEmpLogin(data){
//   try{
//     const checkEmailAndPassword=await empDeptModel.findOne({email:data.email});
//     if(checkEmailAndPassword!=null){
//         (
//             await hasher.comparePassword(data.password,checkEmailAndPassword.password)
//         )
//         {
//             let token = await generateToken(
//                 checkEmailAndPassword._id,
//                 checkEmailAndPassword.name,
//                 checkEmailAndPassword.email,
//                 //checkUserExist.designation
//               );
//               console.log(token)
//               return {
//                 token: token,
//                 user: await _.pick(checkEmailAndPassword, ["name", "_id","email"]),
//               }
//         }
//     }
//   }
//   catch(err){
//     return err
//   }
// }
async function fcnUpdateSalaryBasedOnDept(data){
    //console.log(data.employeee,"dept")

    try{
        if(data!=null){
            let getEmpdata=await empDeptModel.findOne({email:data.email})
            for (let j = 0; j <data.employeee.length; j++) {
                let flag = true;
                for (let i= 0; i<getEmpdata.employeee.length; i++) {
                   if(data.employeee[j].department==getEmpdata.employeee[i].department){
                              getEmpdata.employeee[i].salary = data.employeee[j].salary;
                              flag = false;
                              break;
                   } 
                }
                if(flag){
                    getEmpdata.employeee.push(data.employeee[j]);
                }
            }
            let updateDetails = await empDeptModel.findOneAndUpdate({email:data.email},{$set:{employeee:getEmpdata.employeee}},{new:true})
            return {message:"updated successfully"}
        }
    //    let updateSalary=await empDeptModel.findOneAndUpdate({email:data.email,employeee:{ $elemMatch: {department:data.dept}}},{$set:{"employeee.$.salary":data.salary}},{new:true})
    //    console.log(updateSalary,"updateSalary")
       // return ({message:"salary Updated Successfully done"})
    }catch(err){

    }
}
async function fcndeleteDept (data){
    console.log("deletefunction",data.email)
    try{
        let checkEmail=await empDeptModel.findOne({email:data.email});
        if(checkEmail!=null){
            const deletedept=await empDeptModel.update({email:data.email},{$pull:{employeee:{department:data.department}}})
            console.log(deletedept,"deletedDat")
            console.log("userData")
            // for (let i = 0; i < data.employeee.length; i++) {
            //             console.log("if statement")
            //             await empDeptModel.update({email:data.email},{$pull:{employeee:{department
            //             :data.employeee[i].department}}},{new:true})
                       
                    
            //       }
            // }
           
            return {message:"delete successfully done"}
           
        }
        
    }
    catch(err){
        return err
    }
}
async function fcnEmpInfo(data){
    try{
        const  checkEmail=await empDeptModel.findOne({email:data.email})
        if(checkEmail!=null){
            return checkEmail
        }
        else{
            return {message:"invalid email"}
        }
    }
    catch(err){
        return err
    }
}

exports.empDeptAllfcns={
    fcnEmpRegister:fcnEmpRegister,
    fcnUpdateSalaryBasedOnDept:fcnUpdateSalaryBasedOnDept,
    fcndeleteDept:fcndeleteDept,
    fcnEmpInfo:fcnEmpInfo
}