const express=require("express");
const stakeHolderModel=require("../models/stakeHolderModel");
const {hasher}=require("../lib/hasher")

async function fcnStakeHolderRegister(data){
    try{
         const checkEmailExsist=await stakeHolderModel.findOne({email:data.email});
         if(checkEmailExsist==null){
             const newstakeHolder=await stakeHolderModel({
                firstName:data.firstName,
                address:data.address,
                role:data.role,
                phoneNumber:data.phoneNumber,
                email:data.email,
                password:await hasher.passwordHasher(data.password)
             })
             await newstakeHolder.save();
            }
    }
    catch(err){
        return err
    }
}

exports.newStakeHolder={
    fcnStakeHolderRegister:fcnStakeHolderRegister
}