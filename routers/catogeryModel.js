const routes=(module.exports=require("express")());
const { error } = require("../loaders/logger");
const productModel=require("../models/catogeryModel");
const {catogeryAllfun}=require("../services/catogeryModel")

routes.post("/addcatogery",async(req,res)=>{
    //console.log(req.body.name)
    try{
        const items=await catogeryAllfun.catogeryRegisterFun(req.body);
        //console.log(req.body);
        console.log(items)
    res.status(200).send({
        items
    })
    }
    catch(err){
        res.send(err)
    }
})

routes.get("/serarchProduct/:key",async (req,res)=>{
    try{
        const name=await catogeryAllfun.searchByName(req.params.key)
        res.send(name)
    }
    catch(err){
        res.send(err)
    }
});
