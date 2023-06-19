const mongoose=require("mongoose");
const connection=require("../loaders/mongoose");
const { stringify } = require("ajv");
const newSchema=new mongoose.Schema({
      studentHNo:{type:String},
      name:{type:String},
      marks:[
        {
            group:{type:String},
            maths:{type:String},
            physics:{type:String},
            computerScience:{type:String},
            total:{type:String,default:null}
        }
      ]
})
const studentModel=connection.db1.model("studentModel",newSchema)
module.exports=studentModel;