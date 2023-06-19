
const mongoose=require("mongoose")
const connection=require("../loaders/mongoose")
const hasher=require("../lib/hasher")
const newSchema=new mongoose.Schema({
     collageName:{type:String},
     departments:
          {
            CSE:[
                {
                    empName:{type:String},
                    score:{type:Number,default:1}
                }
            ],
            EEE:[
                {
                    empName:{type:String},
                    score:{type:Number,default:1}
                }
            ],
            CIVIL:[
                {
                    empName:{type:String},
                     score:{type:Number,default:1}
                }
            ]
          }
     
});
const newEmployeeeRregister=connection.db1.model("newEmployeeeRregister",newSchema);
module.exports=newEmployeeeRregister;
