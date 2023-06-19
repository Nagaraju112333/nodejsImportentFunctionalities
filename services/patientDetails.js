const { invalid } = require("moment");
const patientModel=require("../models/patientDetails");
const patientDetails = require("../routers/patientDetails");

async function fcnAddPatient(data){
    try{
        var patientNumber = await Math.floor(100000 + Math.random() * 900000);
         if(data!=null){
            let newPatient=await patientModel({
                name:data.name,
                age:data.age,
                address:data.address,
                phoneNumber:data.phoneNumber,
                alterNativeNumber:data.alterNativeNumber,
                patientNumber:patientNumber
            })
            await newPatient.save();
            return ({message:"new patient added successfully done"})
         }
    }
    catch(err){
       return err
    }
}
async function fcnUpdatePatient(data){
    console.log(data,"vhdjks")
    try{
        let checkPatientNumber=await patientModel.findOne({patientNumber:data.patientNumber});
        console.log(checkPatientNumber,"patientDetails")
        if(checkPatientNumber!=null){
          
        let updatePatientDetaisl=await patientModel.findOneAndUpdate({patientNumber:data.patientNumber},{$set:{age:data.age,phoneNumber:data.phoneNumber}},{new:true})
            return ({message:"Patient  Details updated Successful Done.."})
        }
        else{
            return ({message:"invalid Patient detaisl"})
        }
    }
    catch(err){
        return (err)

    }
}
async function fcnPatientInfo(pNumber){
    try{
        let getPatientInfo=await patientModel.findOne({patientNumber:pNumber})
          if(getPatientInfo!=null){
            //return getPatientInfo
            let patientInfo=await patientModel({
                name:getPatientInfo.name,
                age:getPatientInfo.age,
                phoneNumber:getPatientInfo.phoneNumber,
                alterNativeNumber:getPatientInfo.alterNativeNumber,
                patientNumber:getPatientInfo.patientNumber
            })
            return patientInfo
          }
          else{
            return ({message:"invalid patient id"})
          }
    }
    catch(err){
        return (err)
    }
}
async function fcnDeletePatient(patientId){
    try{
        let patientData=await patientModel.findOne({patientNumber:patientId});
        if(patientData!=null){
            let deletePatientInfo=await patientModel.findOneAndDelete({patientNumber:patientId});
            return ({message:"patient delete Successfully done"})
        }
        else{
            return ({message:"patient details not found with Id : ",patientId})
        }
    }
    catch(err){
        return err


    }
}
async function fcnAddPatientDiesease (data){
    try{
       
        //var diseaseNumber = await Math.floor(100000 + Math.random() * 900000);
        function disease() {
            var minm = 10000;
            var maxm = 99999;
           let numbers = Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;
            numbers++;
            return numbers
        }

        for (let i= 0; i< data.disease.length; i++) {
            data.disease[i].diseaseID=disease();
        
        }
        let patientDisease=await patientModel.findOne({patientNumber:data.patientNumber})
         
        if(patientDisease!=null){
           
            for (let j= 0; j<data.disease.length; j++) {
               
             let flag=true;
             for (let k= 0;k< patientDisease.disease.length; k++) {
              
                if(data.disease[j].diseaseName==patientDisease.disease[k].diseaseName){
                    console.log("fdsjbsdfjsdbjh")
                    patientDisease.disease[k].count +=1;
                     flag=false;
                     break;
                }
                
             }
             if(flag){
                console.log("different disease detaisl")
                patientDisease.disease.push(data.disease[j]);
            }
            
            
                
            }
            let UpdateCse = await newEmployeeeRregister.findOneAndUpdate({patientNumber:data.patientNumber},{$set:{disease:data.disease}},{new:true})
            return{message:"successfully"}
            //await patientModel.findOneAndUpdate({patientNumber:data.patientNumber},{$set:{disease:data.disease}},{new:true})
           // await patientModel.findOneAndUpdate({patientNumber:data.patientNumber},{$set:{disease:data.disease}},{new:true})
        //     data.disease[0].diseaseID = diseaseNumber;
        //     data.disease[0].Date = Date()
        //  let updatePatientData=await patientModel.findOneAndUpdate({patientNumber:data.patientNumber},{$set:{disease:data.disease}},{new:true});
        //  console.log(updatePatientData,"updatepatients Data")
         return ({message:"patient disease added successfully Added.."})
        }
    }
    catch(err){
        return 
    }
}
exports.patientAllFunctions={
    fcnAddPatient:fcnAddPatient,
    fcnUpdatePatient:fcnUpdatePatient,
    fcnPatientInfo:fcnPatientInfo,
    fcnDeletePatient:fcnDeletePatient,
    fcnAddPatientDiesease:fcnAddPatientDiesease
}

