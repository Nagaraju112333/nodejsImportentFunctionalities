const mongoose=require("mongoose");
const connection=require("../loaders/mongoose");
const newPatient=new mongoose.Schema({
  name:{type:String},
  age:{type:Number},
  address:{type:String},
  phoneNumber:{type:String},
  alterNativeNumber:{type:String},
  patientNumber:{type:String},
  disease:[
    {
      diseaseName:{type:String},
      diseaseID:{type:String},
      Date:{type:String},
      count:{type:Number,default:1}
    }
  ]
})
const patientModel=connection.db1.model("patientModel",newPatient);
module.exports=patientModel;
