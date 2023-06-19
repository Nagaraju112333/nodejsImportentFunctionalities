const routes=(module.exports=require("express")());
const {fcnAllProductFunction}=require("../services/productModel")
routes.post("/addNewProduct",async (req,res)=>{
    try{
        const product=await fcnAllProductFunction.fncAddProduct(req.body);
        res.send(product);
    }
    catch(err){
        res.send(err)
    }
})