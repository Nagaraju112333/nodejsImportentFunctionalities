const routes=(module.exports=require("express")());
const {allUniversitiesFcns}=require("../services/universities")
routes.post("/addUniversities",async (req,res)=>{
    console.log(req.body.name,"routes name")
       try{
        let univer=await allUniversitiesFcns.fcnAddUniversity(req.body)
         req.send(univer)
       }
       catch(err){
        res.send(err)
       }
})
routes.get("/getuniversities",async (req,res)=>{
    try{
         let uData=await allUniversitiesFcns.fcnmatch(req.query.country,req.query.city)
         res.send(uData)
    }
    catch(err){
     res.send(err)
    }
});
routes.get("/project",async (req,res)=>{{
      try{
          let projectData=await allUniversitiesFcns.fcnProject();
        res.send(projectData)
      }
      catch(err){
      res.send(err);
      }
}});
routes.get("/group",async (req,res)=>{
    try{
     
        let groupData=await allUniversitiesFcns.fcnGroup();
        res.send(groupData)
    }
    catch(err){
        res.send(err)
    }
});
routes.get("/out",async (req,res)=>{
    console.log("out")
    try{
        let outdata=await allUniversitiesFcns.fcnOut();
        res.send(outdata)
    }
    catch(err){
      res.send(err)
    }
})
routes.get("/unwind",async (req,res)=>{
    try{
        let unwindData=await allUniversitiesFcns.fcnUnWind();
        res.send(unwindData);
    }

    catch(err){
        res.send(err)
    }
});
routes.get("/sort",async(req,res)=>{
    try{
        let sortData=await allUniversitiesFcns.fcnSort();
        res.send(sortData)
    }
    catch(err){
    res.send(err)
    }
});
routes.get("/groupWiseGetData",async (req,res)=>{
    try{
        let groupdata=await allUniversitiesFcns.fcngroupWiseFirstRecord();
        res.send(groupdata);
    }
    catch(err){
        res.send(err)
    }
})

