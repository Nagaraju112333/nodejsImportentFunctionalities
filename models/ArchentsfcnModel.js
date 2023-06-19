const mongoose=require("mongoose")
const connection=require("../loaders/mongoose");
const newSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    designation:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    password:{type:String},
    profileImage:{type:String},
    createPassword:{type:String},
    otp:{type:Number}
})
const archentsfcnModel=connection.db1.model("archentsfcnModel",newSchema)
module.exports=archentsfcnModel;