const express=require("express");
const productModel=require("../models/catogeryModel");
//const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { json } = require("body-parser");
async function catogeryRegisterFun(data){
    //console.log("------")
    try{
        const catogeries=await productModel({
            name:data.name,
            price:data.price,
            brand:data.brand,
            catogery:data.catogery
        });
        //console.log(catogeries)
        await catogeries.save()
        return "new catogery added successfully done..."

    }
    catch(err){
      return json({err})
    }
}


 async function searchByName(data){
   try{
    const datainfo=data;
  console.log(datainfo)
     const search=await productModel.find({
        "$or":[
        {"name":{$regex:data}}
        ]
       })
       return search;
   } 
   catch(err){
    return err;
   }
 }
 
exports.catogeryAllfun={
    catogeryRegisterFun:catogeryRegisterFun,
    searchByName:searchByName
}