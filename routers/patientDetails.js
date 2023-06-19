const routes=(module.exports=require("express")());
const { captureRejectionSymbol } = require("nodemailer/lib/xoauth2");
const {patientAllFunctions}=require("../services/patientDetails");
const patientDetails = require("./patientDetails");
routes.post("/addNewPatient",async (req,res)=>{
    try{
        const newpatient=await patientAllFunctions.fcnAddPatient(req.body);
        res.send(newpatient);

    }
catch(err){
    res.send(err)
}
})
routes.post("/updatePatientDetaisl",async(req,res)=>{
    try{
        const updatePatient=await patientAllFunctions.fcnUpdatePatient(req.body);
        res.send(updatePatient)
    }
    catch(err){  
        res.send(err)
    }
})
routes.get("/getPatientInfo",async (req,res)=>{
    
    try{
        let getPatientInfo=await patientAllFunctions.fcnPatientInfo(req.query.pNumber);
        res.send(getPatientInfo)
    }
    catch(err)
    {
        return err
    }
});
routes.post("/deletePatientDetails",async (req,res)=>{
    try{
        let patientInfo=await patientAllFunctions.fcnDeletePatient(req.query.patientId);
        res.send(patientInfo)
    }
    catch(err){
        return err
    }
})
routes.post("/addPatientDisease",async (req,res)=>{
    console.log(req.body,"data")
    try{
        const patientDisease=await patientAllFunctions.fcnAddPatientDiesease(req.body);
        res.send(patientDisease)
    }
    catch(err){
        return err
    }
});
