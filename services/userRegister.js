const express=require('express');
const mongoose=require('mongoose');
const userModel=require('../models/userModel');
//const hasher=require('../lib/hasher')
async function userRegister(data){
    try{
        let checkUserExsits=await userModel.find({
         or$:[{email:data.email},{phonNumber:data.phonNumber}]
        })
        if(checkUserExsits){
           return  { message:"user  already exsits with phoneNumber or email"}
        }
        else{
            const newuser=await userModel({
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                designation:data.designation,
                password:data.password,
                phonNumber:data.phonNumber
            })
            await newuser.save();
            return {message:"user register successfully"}
        }
    }
    catch(err){
       return err;
    }
}
exports.userServices={
    userRegister:userRegister
}