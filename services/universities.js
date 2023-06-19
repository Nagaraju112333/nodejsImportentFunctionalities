const universitieModels=require("../models/universities")


async function fcnAddUniversity (data){
    console.log(data.name,"name")
       try{
        if(data!=null){
            let newUniversity=await universitieModels({
                country:data.country,
                city:data.city,
                name:data.name,
                location:data.location,
                students:data.students,
                branch:data.branch
            })
           // console.log(newUniversity,"alluniversitydetails")
            await newUniversity.save();
            return ({message:"success"})
        }
       }
       catch(err){
        return err
       }
}
async function fcnmatch (data){
    try{
        if(data!=null){
            let universityData=await universitieModels.aggregate([
                {$match:{country:"Spain",city:"Salamanca"}}
            ])
            return universityData
        }
    }
    catch(err)
    {
      return err
    }
}
async function fcnProject (){
    try{
       
        let projectData=await universitieModels.aggregate([
            {$project:{_id:0,country:1,city:1,name:1}}
        ])
        return projectData;
       
    }
    catch(err){
        return err
    }
}
async function fcnGroup (){
    try{
       
            let groupdata=await universitieModels.aggregate([
                {$group:{_id:"$name",totaldocuments:{"$sum":1}}}
            ])
            return groupdata
        
    }
    catch(err){
        return err
    }
}
async function fcnOut(){
  //  console.log("hfbsddskjf")
  let groupdata=await universitieModels.aggregate([
    {$group:{_id:"$name",totaldocuments:{"$sum":1}}},
    //{$out:'Recor'}
])
        
    console.log(groupdata,"------------------")
    var newdocu=await groupdata.Recor.find();
    console.log("newccoll")
    return newdocu;
};
async function fcnUnWind(){
    try{
        let unwinddata=await universitieModels.aggregate([
            {$match:{name:"USAL"}},
            {$unwind:"$students"}
        ])
          return unwinddata
      }
      catch(error){
        return err
      }
}
async function fcnSort (){
 try{

  let maxNumber=await universitieModels.aggregate([
    {$match:{name:"USAL"}},
    //{$group:{_id:"$students.number",maxnumber:{$max:"$students.number"}}},
    {$project:{maxvalue:{$max:"$$maxnumber"}}},
  ])
  return maxNumber;


















    // let sortData=await universitieModels.aggregate([

    //     {$match:{name:"USAL"}},
    //     { $unwind : '$students' },
    //     //{$sort:{"students:number":-1}},//decending order
    //     {$project:{_id:0,"students.year":1,"students.number":1}},//{$project:{_id:0,"students.year":1,"students.number":1}},
    //     //{$limit:2}
    //     // { $unwind : '$students' },
    //     // {$count:"totaldocuments"}
    // ])
    // return sortData



 }
 catch(err){
    return err
 }
}

async function fcngroupWiseFirstRecord(){
    try{
          let groupwiseData=await universitieModels.aggregate([
            {$group:{_id:"$branch",firstName:{$first:"$name"},lastRecord:{$last:"$name"}}}
          ])
          console.log(groupwiseData,"firstName of groupWise");
         return groupwiseData
    }
    catch(err){
        return err
    }
  }
//   let group=await universitieModels.aggregate([
//     {
//         $group:{_id:"$branch",
//         firstname: { $last: "$name" }}
//     },
//  ]
//  )
//  console.log("group records")

//  return group;
exports.allUniversitiesFcns={
    fcnAddUniversity:fcnAddUniversity,
    fcnmatch:fcnmatch,
    fcnProject:fcnProject,
    fcnGroup:fcnGroup,
    fcnOut:fcnOut,
    fcnUnWind:fcnUnWind,
    fcnSort:fcnSort,
    fcngroupWiseFirstRecord:fcngroupWiseFirstRecord
}