const  mongoose=require("mongoose");
const connection=require("../loaders/mongoose")
const newSchema=await new mongoose.Schema({
    firstName:{type:String},
    address:{type:String},
    role:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    password:{type:String}
});
const stakeHolderModel=connection.db1.model("stakeHolderModel",newSchema);
module.exports=stakeHolderModel