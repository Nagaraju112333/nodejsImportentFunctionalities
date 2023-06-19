const mongoose=require("mongoose");
const express=require("express")
const connection=require("../loaders/mongoose")
const NewSchema=new mongoose.Schema({
    country:{type:String},
    city:{type:String},
    name:{type:String},
    location:{
        type :{type:String},
        coordinates:[{type:String}]

    },
    students:[
        {
            year:{type:String},
            number:{type:String}
        }
    ],
    branch:{type:String}
});
const universitieModels=connection.db1.model("universitieModels",NewSchema);
module.exports=universitieModels;