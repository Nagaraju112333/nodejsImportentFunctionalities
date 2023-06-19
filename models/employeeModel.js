const express=require("express");
const mongoose=require("mongoose");
const connection=require("../loaders/mongoose")
const newSchema=new  mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    gender:{type:String},
    email:{type:String},
    password:{type:String},
    phoneNumber:{String},
    admin1:{type:String},
    admin2:{type:String},
    role:{type:String},
    isAccepted:{type:Boolean},
    admin_Id:{type:String}
});

const newEmployeeModel=connection.db1.model("newEmployeeModel",newSchema);
module.exports=newEmployeeModel;