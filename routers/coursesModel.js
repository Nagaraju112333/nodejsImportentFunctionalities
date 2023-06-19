const routes=(module.exports=require("express")());
const {allCourceFcn}=require("../services/coursesModel");
routes.post("/addNewCource",async (req,res)=>{
     console.log(req.name)
    try{
         let newcource=await allCourceFcn.fcnAddCourse(req.body);
         res.send(newcource);
    }
    catch(err){
        res.send(err)
    }
});
routes.get("/lookup",async (req,res)=>{
    try{
        let  lookupdata=await allCourceFcn.fcnlookUpData();
         res.send(lookupdata);
    }
    catch(err){
        res.send(err)
    }
})
routes.get("/lookUpdata",async(req,res)=>{
    try{
        let lookup=await allCourceFcn.fcnlookUpTwocollections(req.body);
        res.send(lookup);
    }
    catch(err){
        return err
    }
});
routes.get("/practiceLookUpData",async (req,res)=>{
    try
    {
       let PlookUpData=await allCourceFcn.fcnPracticeLookUP(req.query.name);
       res.send(PlookUpData)
    }
    catch(err)
    {
     res.send(err)
    }
})