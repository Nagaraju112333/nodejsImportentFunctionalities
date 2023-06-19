const connection=require("../loaders/mongoose");
const mongoose=require("mongoose");
const newSchema=new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    address:{type:String},
    phoneNumber:{type:String},
    alterNativeNumber:{type:String},
    diseases:[
        {
            diseaseName:{type:String},
            diseaseID:{type:Number},
            testCount:{type:Number,default:1}
        }
    ]

})
const patientSecondModel=connection.db1.model("patientSecondModel",newSchema)
module.exports=patientSecondModel;