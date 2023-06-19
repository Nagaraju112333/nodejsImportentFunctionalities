const mongoose=require('mongoose');
const con=require('../loaders/mongoose')
const { type } = require('os');
const userSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    designation:{type:String},
    password:{type:String},
    phoneNumber:{type:String}
})
const userModel= con.db1.model("userModel",userSchema);
module.exports=userModel;
