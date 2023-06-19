const newEmployeeeRregister=require("../models/collage");
const hasher=require("../lib/hasher");
const { collect } = require("underscore");


async function fcnregisterInCollage (data){
    try{
        if(data!=null){
            let  checkcollageName=await newEmployeeeRregister.findOne({collageName:data.collageName})
            console.log(checkcollageName,"collage details ")
            if(checkcollageName!=null){

                let objectKeys = Object.keys(data.departments);
               // console.log(objectKeys,"objectKeyFunctionality")
                for (let i = 0; i < objectKeys.length; i++) {
                  switch (objectKeys[i]) {
                    case "CSE":
                      console.log("CSE");
                      let labDetails = await fcnCSEDetails(
                          checkcollageName,data
                      );
                      break;
                    case "EEE":
                      console.log("EEE");
                      let EEEdetails = await fcnEEEDetails(
                        checkcollageName,
                        data
                      );
                      break;
                    case "CIVIL":
                      console.log("CIVIL");
                      let CIVElDetails = await fcnCIVILDetails(
                        checkcollageName,
                        data
                      );
                      break;
                  }
                }
 
                // const department=await newEmployeeeRregister.find({departments:checkcollageName.departments})
                // console.log(department,"department")
                return {message:"updated Successfully"}
            }
            else{
                //  for (let i= 0;i< array.length; i++) {
                //     //const element = array[index];
                    
                //  }
                let newUser=new newEmployeeeRregister({
                    collageName:data.collageName,
                    departments:data.departments
                    
    
                })
                await newUser.save();
                return ({message:"success"})
                

            }
          
        }
        else{
            return ({message:"null data"})
        }
    }
    catch(err){
        return err

    }
}

async function fcnCSEDetails(checkcollageName,data){
   try{
    if(checkcollageName.departments.CSE.length != 0){
        for (let j= 0; j<data.departments.CSE.length; j++) {
                let flag = true;
              console.log(data.departments.CSE[j],"fromname")
              for (let i=0; i< checkcollageName.departments.CSE.length; i++) {
               
               if(checkcollageName.departments.CSE[i].empName==data.departments.CSE[j].empName){
                        checkcollageName.departments.CSE[i].score +=1;
                        flag = false;
                        break;
               }
            }
            if(flag){
                checkcollageName.departments.CSE.push(data.departments.CSE[j]);
            }
            
        }

        let UpdateCse = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.CSE":checkcollageName.departments.CSE}},{new:true})
        return{message:"successfully"}
        

    }else{
        let updateCSE = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.CSE":data.departments.CSE}})
    }
       
   }
   catch(err){
    return err
   }
}
async function fcnEEEDetails(checkcollageName,data){
    try{
     if(checkcollageName.departments.EEE.length != 0){
         for (let j= 0; j<data.departments.EEE.length; j++) {
                 let flag = true;
               console.log(data.departments.EEE[j],"fromname")
               for (let i=0; i< checkcollageName.departments.EEE.length; i++) {
                
                if(checkcollageName.departments.EEE[i].empName==data.departments.EEE[j].empName){
                         checkcollageName.departments.EEE[i].score +=1;
                         flag = false;
                         break;
                }
             }
             if(flag){
                 checkcollageName.departments.EEE.push(data.departments.EEE[j]);
             }
             
         }
 
         let UpdateCse = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.EEE":checkcollageName.departments.EEE}},{new:true})
         return{message:"successfully"}
         
 
     }else{
         let updateCSE = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.EEE":data.departments.EEE}})
     }
        
    }
    catch(err){
     return err
    }
 }
 async function fcnCIVILDetails(checkcollageName,data){
    try{
     if(checkcollageName.departments.CIVIL.length != 0){
         for (let j= 0; j<data.departments.CIVIL.length; j++) {
                 let flag = true;
               console.log(data.departments.CIVIL[j],"fromname")
               for (let i=0; i< checkcollageName.departments.CIVIL.length; i++) {
                
                if(checkcollageName.departments.CIVIL[i].empName==data.departments.CIVIL[j].empName){
                         checkcollageName.departments.CIVIL[i].score +=1;
                         flag = false;
                         break;
                }
             }
             if(flag){
                 checkcollageName.departments.CIVIL.push(data.departments.CIVIL[j]);
             }
             
         }
 
         let UpdateCse = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.CIVIL":checkcollageName.departments.CIVIL}},{new:true})
         return{message:"successfully"}
         
 
     }else{
         let updateCSE = await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.CIVIL":data.departments.CIVIL}})
     }
        
    }
    catch(err){
     return err
    }
 }
 async function fcnNewCollageRegister (data){
    try{

        const  checkCollage=await newEmployeeeRregister.findOne({collageName:data.collageName});
        if(checkCollage!=null){
            let objectKeys = Object.keys(data.departments);
            console.log(objectKeys,"key")
            for (let i = 0; i < objectKeys.length; index++) {
               switch (objectKeys[i]) {
                case "CES":
                    console.log("cse")
                    let cseFcn=await fcnCSE(
                        checkCollage,
                        data
                    )
                    break;
                    case "EEE":
                        console.log("EEE Black")
                        let fncEEE=await fcnEEE(
                            checkCollage,data
                    )
                    break
                    case "CIVIL":
                    let fcnCIVIL=await fcnCIVIL(
                        checkCollage,
                        data
                    )
                default:
                    break;
               }
               return ({message:"update successfully done"})
                
            }

        }
        else{
            const newcollage=await newEmployeeeRregister({
                collageName:data.collageName,
                departments:data.departments
            })
            await newcollage.save();
            return ({message:"new collage Added successfully done"})
        }
    }
    catch(err){
        return err
    }
 }
 async function fcnEEE(checkCollage,data){
    try{
      
       if(checkCollage.departments.EEE.length!=0){
       
          for (let i= 0; i< data.departments.EEE.length; i++) {
            let flag=true;
            console.log(data.departments.EEE[i].empName,"Name")
            for (let j= 0; j < checkCollage.departments.EEE.length; j++) {
                console.log(checkCollage.departments.EEE[j].empName,"matchname")
               if(data.departments.EEE[i].empName==checkCollage.departments.EEE[j].empName){
                    checkCollage.departments.EEE[j].score +=1;
                     flag=false;
                     break;
               }
                
            }
            if(flag){
                checkCollage.departments.EEE.push(data.departments.EEE[i])
            }
            
          }
          let updateScoreDetails=await newEmployeeeRregister.findOneAndUpdate({collageName:data.collageName},{$set:{"departments.EEE":checkCollage.departments.EEE}},{new:true})
       }
    }
    catch(err){
        return err
    }
 }


exports.collageAllfcn={
    fcnregisterInCollage:fcnregisterInCollage,
    fcnNewCollageRegister:fcnNewCollageRegister
}