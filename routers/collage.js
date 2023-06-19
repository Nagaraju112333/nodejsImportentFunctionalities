const routes=(module.exports=require("express")());
const {collageAllfcn}=require("../services/collage")
routes.post("/empRegisterWithMultipleDepartment", async (req,res)=>{
      try{
          const data=await collageAllfcn.fcnregisterInCollage(req.body);
          res.send(data)
      }
      catch(err)
      {
        res.send(err)
      }
})
routes.post("/collageRegister",async (req,res)=>{
   try{
    const newCollage=await  collageAllfcn.fcnNewCollageRegister(req.body);
    res.send(newCollage);
   }
   catch(err){
    res.send(err)
   }
})