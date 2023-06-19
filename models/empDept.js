const mongoose=require("mongoose");
const connection=require("../loaders/mongoose");

const newSchema=await new mongoose.Schema({
    name:{type:String},
    gender:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
     AccountDetails:[
        {
          persondetails:
          {
                bankDetails:
                {
                 accountId:{type:String},
                 accountNumber:{type:String},
                 balance:{type:String}
                 },
                 pfDetails:
                 {
                  Pf:{type:String},
                 }
             },
            personaldetaiisl:{
                salaryDetails:{
                    salary:{type:String},
                    alternativePhoneNumber:{type:String}
                }
                 
             }
        }
        
     ]
});
const empDetailsModel=connection.db1.model("empDetailsModel",newSchema);
module.exports=empDetailsModel;
