const mongoose=require("mongoose");
const connection=require("../loaders/mongoose");

const newSchema= new mongoose.Schema({
    name:{type:String},
    gender:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    password:{type:String},
    employeee:[
          {
              serialNumber:{type:Number},
              department:{type:String},
              salary:{type:Number}
          }

     ]
});
const empDeptModel=connection.db1.model("empDeptModel",newSchema);
module.exports=empDeptModel;
