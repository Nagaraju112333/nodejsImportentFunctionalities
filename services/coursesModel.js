const coursesModel=require("../models/coursesModel");
const universitieModels=require("../models/universities");
async function fcnAddCourse (data){
    console.log(data,"vhbjkhvbjk")
    try{
        if(data!=null){
          let newCourse=await coursesModel({
            university:data.university,
            name:data.name,
            level:data.level

          })
          await newCourse.save();
          return ({message:"newcourse added successfully done"})
        }
    }
    catch(err){
        return err
    }
}
async function fcnlookUpData(){
    try{
        let LooKUpData=await universitieModels.aggregate([
            {$match:{name:"UPSA"}},
            {$project:{_id:0,name:1}},
            {
                $lookup:{
                    from:"coursesmodels",
                    localField:"name",
                    foreignField:"university",
                    as:"coursesmodels"
                }
            }
        ])
        return LooKUpData
    }
 catch(err){
    return err
 }
}
async function fcnlookUpTwocollections(data){
    try{
        let data=await universitieModels.aggregate([
            {$match:{name:"UPSA"}},
            {
                $lookup:{
                    from:"coursesmodels",
                    localField:"name",
                    foreignField:"university",
                    as:"usermodel"
                }
            },
            // {
            //     $project:{
            //         "usermodel.university":1,
            //         "usermodel.level":1
            //     }
            // },
            {
                $unwind: "$usermodel"
              },
            {
                $sort:{
                   "usermodel.level":-1
                }
            },
            {
                $group:{
                    _id:"$usermodel.level",totaldocuments:{
                       "$sum":1
                    }
                }
            }
        ]);
        
        return  data;
    }
    catch(err){
        return err
    }
}
async function fcnPracticeLookUP(universityName){
    try{
        let lookupdata=await universitieModels.aggregate([
            {$match:{name:universityName}},
           // {$project:{_id:0,name:1}},
            {
                $lookup:{
                    from:"coursesmodels",
                    localField:"name",
                    foreignField:"university",
                    as:"coursemodel"
                }
            },
            {
                $sort:{
                    "coursemodel.name":-1
                }
            },
            {
                $unwind:
                    "$coursemodel"
                
            },
            {
                $group:{
                    _id:"$coursemodel.name",totaldocuments:{"$sum":1}
                }
            }
           
        ])
        return lookupdata
    }
    catch(err){
        return err
    }
}
exports.allCourceFcn={
    fcnAddCourse:fcnAddCourse,
    fcnlookUpData:fcnlookUpData,
    fcnlookUpTwocollections:fcnlookUpTwocollections,
    fcnPracticeLookUP:fcnPracticeLookUP
}