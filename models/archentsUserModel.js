const express=require("express");
const mongoose=require("mongoose");
const con=require("../loaders/mongoose")
const newSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    gender:{type:String},
    email:{type:String},
    password:{type:String},
    phoneNumber:{type:String},
    role:{type:String},
    firstRegister:{type:Number},
    otp:{type:String}
})
const archentsUser=con.db1.model("archentsUser",newSchema);
module.exports=archentsUser;
