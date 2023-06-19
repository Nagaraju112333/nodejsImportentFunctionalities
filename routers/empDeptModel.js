const routes=(module.exports=require("express")());
const { DefaultEventHandlerStrategies } = require("fabric-network");
const {empDeptAllfcns}=require("../services/empDeptModel");




routes.post("/empDeptRegister",async (req,res)=>{
    console.log(req.body,"data")
    try{
        const user=await empDeptAllfcns.fcnEmpRegister(req.body);
        res.send(user);
    }
    catch(err){
        return err
    }
});
routes.post("/updateDept",async(req,res)=>{
    //console.log("update method")
        try{
            let userdept=await empDeptAllfcns.fcnUpdateSalaryBasedOnDept(req.body)
            res.send(userdept)
        }
        catch(err){
            res.send(err)
        }
});
routes.post("/deleteDept",async (req,res)=>{
    try{
        const  delteDept=await empDeptAllfcns.fcndeleteDept(req.body);
        res.send(delteDept);

    }
    catch(err){
        res.send(err)
    }
})
routes.get("/getEmpInfo",async (req,res)=>{{
     try{
    
       const userdata=await empDeptAllfcns.fcnEmpInfo(req.body)
       res.send(userdata)
     }
     catch(err){
        res.send(err)
     }
}})