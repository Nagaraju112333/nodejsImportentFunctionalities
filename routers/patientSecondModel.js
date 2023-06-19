const routes=(module.exports=require("express")());
const { accessapproval_v1beta1 } = require("googleapis");
const {allsecondpatientfunctions}=require("../services/patientSecondModel")
routes.post("/admitNewPatient",async (req,res)=>{
    try{
      let addPatient=await allsecondpatientfunctions.fcnAdmitNewPatient(req.body);
      res.send(addPatient)
    }
    catch(err){
        res.send(err)
    }
});
routes.get("/getallPatients",async (req,res)=>{
    try{
        let getAll=await allsecondpatientfunctions.fcngetallPatientDetais();
        res.send(getAll);
    }
    catch(err){
        return err
    }
})
routes.get("/getpatient",async (req,res)=>{
    console.log("hfjdshfsjk")
    try{
        console.log("vhjdkscsdkffhdkjsjkj")
        let patientDetaisl=await allsecondpatientfunctions.fcnGetPatientInfo(req.query.patientId);
        res.send(patientDetaisl);
    }
    catch(err){
        res.send(err)
    }
});
routes.post("/updatePatientDetails",async(req,res)=>{
    try{
        let updatePatientDetails=await allsecondpatientfunctions.fcnUpdatePatientDetais(req.body);
        res.send(updatePatientDetails)
    }
    catch(err){
     res.send(err)
    }
})
routes.delete("/deletePatient",async (req,res)=>{
    try{
        let patientNumber=await allsecondpatientfunctions.fcnDeletePatient(req.query.phoneNumber);
        res.send(patientNumber)
    }
    catch(err){
        return err
    }
})
routes.post("/adddisease",async(req,res)=>{
    try{
        let addPatientDiseases=await allsecondpatientfunctions.fcnAddPatientDisease(req.body);
        res.send(addPatientDiseases)
    }
    catch(err){  
        res.send(err)
    }
})
//  add patient disease
routes.post("/addPatientDisease",async(req,res)=>{
    console.log("routes",req.body)
    try{
        let addPatientDiseases=await allsecondpatientfunctions.fcnAddPatientDisease(req.body);
        res.send(addPatientDiseases)
    }
    catch(err){  
        res.send(err)
    }
});
routes.post("/deleteDisease",async(req,res)=>{
    try
    {
     let deletedisease=await allsecondpatientfunctions.fcnDeleteDisease(req.query.diseaseId,req.query.phoneNumber);
     res.send(deletedisease)
    }
    catch(err)
    {
        res.send(err)
    }
});
//aggregation all funcitonalities
routes.get("/aggregateRoute",async (req,res)=>{
    console.log("hfjdshfsjk")
    try{
        console.log("route")
        let aggregate=await allsecondpatientfunctions.fcnAggregate(req.query.phoneNumber);
        res.send(aggregate);
    }
    catch(err){
        res.send(err)
    }
});
routes.post("/secondPatientDisease",async (req,res)=>{
    console.log(req.body)
    try{
        let diseasedata=await allsecondpatientfunctions.fcnpatientDisease(req.body);
        res.send(diseasedata);

    }
    catch(err){
        res.send(err)
    }
});
routes.post("/deletediseasesObject",async(req,res)=>{
     console.log(req.body,"body")
    try{
        let deleteOneDeleteObject=await allsecondpatientfunctions.fncdeleteObject(req.body);
        res.send(deleteOneDeleteObject)
    }
    catch(err){
        return err
    }
})


