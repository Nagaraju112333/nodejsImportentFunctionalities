// const routes=(module.exports=require("express")())
// //const {fcnStudentAllfunctions}=require("../services/productModel")
// routes.post("/addStudentMarks",async (req,res)=>{
//     try{
//         const newstudent=await fcnStudentAllfunctions.fcnStudentRegister(req.body);
//         res.send(newstudent)
//     }
//     catch(err){
//         res.send(err)
//     }
// });
// routes.post("/updateMarks",async (req,res)=>{
//     console.log("working")
//     try{
//         const marks=await fcnStudentAllfunctions.fcnupdateMarks(req.body);
//         res.send(marks)
//     }
//     catch(err){
//        res.send(err);
//     }
// })