const { functions, forEach } = require("underscore");
const patientSecondModel=require("../models/patientSecondModel");
const patientModel = require("../models/patientDetails");

async function fcnAdmitNewPatient(data){
    console.log(data)
    try{
        let checkpatientExists=await patientSecondModel.findOne({phoneNumber:data.phoneNumber});
        if(checkpatientExists==null){
            let newPatient=await patientSecondModel({
                name:data.name,
                age:data.age,
                address:data.address,
                phoneNumber:data.phoneNumber,
                alterNativeNumber:data.alterNativeNumber,
                diseases:data.diseases

            })
            await newPatient.save();
            return ({message:"patient Admit successfully done..."})
        }
        else{
          return ({message:"patient alreay register with Mobile Number: "+data.phoneNumber})
        }
    }
    catch(err){
        return err
    }
}
async function fcngetallPatientDetais(){
    try{
        let getAllPatients=await patientSecondModel.find();
     return getAllPatients;
    }
    catch(err){
        return err
    }
}
async function fcnGetPatientInfo(patientId){
    try{
        let patientDetaisl=await patientSecondModel.findOne({_id:patientId})
        console.log(patientDetaisl,"patienrdetails")
        if(patientDetaisl!=null){
            return patientDetaisl
        }
        else{
            return ({message:"patient not found with id:"+patientId})
        }
    }
    catch(err){
        return err
    }
}
async function fcnUpdatePatientDetais(data){
    try{
        if(data.phoneNumber!=null || data.phoneNumber==undefined)
        {
            console.log("shfhsjdfhjfdsjffdshfjshjfsjdhfsjk",data.phoneNumber)
            let updatePatient=await patientSecondModel.findOneAndUpdate({phoneNumber:data.phoneNumber},{$set:{address:data.address,age:data.age}});
            return ({message:"patient  details Updated Successfully Done.."});

        }
    }
    catch(err){
        return err

    }
}
async function fcnDeletePatient(phoneNumber){
    try{
        let deletePatient=await patientSecondModel.findOneAndDelete({phoneNumber:phoneNumber});
        return ({message:"patient Deleted Sucessfully done..."})
    }
    catch(err){
        return err
    }
}
// patient Diseases
async function fcnAddPatientDisease(data){
    console.log(data.name)
    try{
        let patientDisease=await patientSecondModel.findOne({phoneNumber:data.phoneNumber});
        if(patientDisease!=null)
        {
            console.log("if condtion true")
            for (let i= 0; i< data.diseases.length; i++) {
                let flag=true;
                 for (let j= 0;j <patientDisease.diseases.length;j++) {
                   if(data.diseases[i].diseaseName==patientDisease.diseases[j].diseaseName){
                      patientDisease.diseases[j].testCount+=1;
                      if(patientDisease.diseases[j].testCount==5 || patientDisease.diseases[j].testCount>5){
                        console.log("discunt condition true",data.diseases[i].diseaseName)
                         let discout= await patientSecondModel.aggregate([
                            {$match:{"diseases.diseaseName":data.diseases[i].diseaseName}},
                            {$addFields:{AnyTestDiscount:"30%"}}
                        ])
                        console.log(discout,"discount data")
                      }
                      flag=false;
                   }
                 }
                 if(flag){
                 patientDisease.diseases.push(data.diseases[i])
                }
                
            }
            let addPatientDetaisl=await patientSecondModel.findOneAndUpdate({phoneNumber:data.phoneNumber},{$set:{diseases:patientDisease.diseases}},{new:true})
             return ({message:"disease added successfully done"})
        }
    }
    catch(err){
        return err
    }
};
// delete disease
async function fcnDeleteDisease (diseaseId,phoneNumber){
    try{
        let deleteRecord = await patientSecondModel.findOneAndUpdate({phoneNumber:phoneNumber},{$pull:{diseases:{diseaseID:diseaseId}}},{new:true})
     return ({message:"patient disease deleted  successfully done.."})
    }
    catch(err){
        return err
    }
};
async function fcnAggregate(phoneNumber){
    
  try{
    let aggregateData=await patientSecondModel.find();
    // let aggregateData =await patientSecondModel.aggregate([
        
    //     //{$project:{_id:0,name:1,age:1,phoneNumber:1}}
    //     // {$match:{phoneNumber:phoneNumber}},
    //     // { $unwind : '$diseases' }
    //    // {$project:{_id:0,name:1,age:1,phoneNumber:1,address:1,diseases:1}}
    //     {$match:{phoneNumber:phoneNumber}},
    //     {$group:{_id:"$diseases.diseaseName",totaldocument:{"$sum":1}}}
    // ])
    // console.log("aggreagte functions",aggregateData)
    // return aggregateData
    return aggregateData;
  }
  catch(err){
    return err
  }
}
async function fcnpatientDisease(data){
    try{
        let patientDetaisl=await patientSecondModel.findOne({phoneNumber:data.phoneNumber});
        console.log(patientDetaisl,"patientdetauis")
        if(patientDetaisl!=null){
          for (let i= 0; i<data.diseases.length; i++) {
            console.log(data.diseases[i].diseaseName,"first for loop")
           let flag=true;
              for (let j= 0; j< patientDetaisl.diseases.length; j++) {
                  if(data.diseases[i].diseaseName==patientDetaisl.diseases[j].diseaseName){
                     patientDetaisl.diseases[j].testCount+=1;
                     flag=false;
                     break;
                    } 
              }
              if(flag){
                console.log("flag true condition")
                patientDetaisl.diseases.push(data.diseases[i]);
                console.log(data.diseases[i],"push data")
                //patientDetaisl.diseases.push(data.diseases[i]);
                return ({message:"patient disase added successfully done."});
              }
          }
          let updatePatientDetais=await patientSecondModel.findOneAndUpdate({phoneNumber:data.phoneNumber},{$set:{diseases:patientDetaisl.diseases}},{new:true});
          return ({message:"patient disease updated successfully done"})
        }
    }
    catch(err){
        return err

    }
}
async function fncdeleteObject(data){
    console.log(data.diseaseid,"diseaseId")
    try{
        let deleteObject=await patientSecondModel.findOne({phoneNumber:data.phoneNumber});
       console.log(deleteObject,"patientdetaisl")
        if(deleteObject!=null){
        let deleteSelectedObject=await patientSecondModel.findOneAndUpdate({phoneNumber:data.phoneNumber},{$pull:{diseases:{diseaseID:data.diseaseid}}},{new :true})
         return ({message:"patient Disease deleted successfully done.."})
        }
    }
    catch(err){
        return err
    }
}
exports.allsecondpatientfunctions={
   fcnAdmitNewPatient:fcnAdmitNewPatient,
   fcngetallPatientDetais:fcngetallPatientDetais,
   fcnGetPatientInfo:fcnGetPatientInfo,
   fcnUpdatePatientDetais:fcnUpdatePatientDetais,
   fcnDeletePatient:fcnDeletePatient,
   fcnAddPatientDisease:fcnAddPatientDisease,
   fcnDeleteDisease:fcnDeleteDisease,
   fcnAggregate:fcnAggregate,
   fcnpatientDisease:fcnpatientDisease,
   fncdeleteObject:fncdeleteObject
}

