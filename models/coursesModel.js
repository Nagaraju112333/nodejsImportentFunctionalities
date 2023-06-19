const connection=require("../loaders/mongoose");
const mongoose=require("mongoose");
const newCourseSchema=new mongoose.Schema({
    university:{type:String},
    name:{type:String},
    level:{type:String}

})
const coursesModel=connection.db1.model("coursesModel",newCourseSchema);
module.exports=coursesModel;
