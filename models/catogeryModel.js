const mongoose=require("mongoose");
const express=require("express");
const con=require("../loaders/mongoose")
const catogeryModels=new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    brand:{type:String},
    catogery:{type:String}
})
const productModel=con.db1.model("productModel",catogeryModels);
module.exports=productModel;