const mongoose=require("mongoose");
const connection=require("../loaders/mongoose")
const newSchema=new mongoose.Schema({
    employeeId:{type:String},
    name:{type:String},
    adminAcceptance:[{
        email:{type:String},
        response:{type:String}
    }]
        
});
const approvalModel=connection.db1.model("approvalModel",newSchema);
module.exports=approvalModel;