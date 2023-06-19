
const newProductModel=require("../models/productModel");
async function fncAddProduct(data){
    try{
          if(data!=null){
            let checkShop=await newProductModel.findOne({shopName:data.shopName});
            if(checkShop!=null){
                let objectKeys = Object.keys(data.products)
               for (let i= 0; i< objectKeys.length; i++) {
                 switch (objectKeys[i]) {
                    case "ammerpet":
                        const fcnammerpet=await fcnamerpet(checkShop,data)
                        return ({message:"update successfully done"})
                        break;
                     case "hitechcity":
                        const fcnhitecity=await fcnhitechcity(checkShop,data)
                        break;
                        case "secendrabad":
                     const fcnsecendrabad=await fcnsecendrabad(checkShop,data);
                     break;
                 }
                
               }
            }
             else{
                const newproduct=await new  newProductModel({
                    shopName:data.shopName,
                    products:data.products
                })
                await newproduct.save();
                return ({message:"newproduct added successfully"})
             }
          }
    }
    catch(err){

    }
}
  async function fcnamerpet(checkShop,data){
    try{
           for (let i= 0; i< data.products.ammerpet.length; i++) {
          let flag=true;
            console.log(data.products.ammerpet[i].productName,"data productName")
                for (let j= 0; j< checkShop.products.ammerpet.length; j++) {
                    if(data.products.ammerpet[i].productName==checkShop.products.ammerpet[j].productName){
                        checkShop.products.ammerpet[j].quantity +=1;
                        flag=false
                    }
                }
                if(flag){
                 checkShop.products.ammerpet.push(data.products.ammerpet[i])
                }
            
           }
           let updateproducts=await newProductModel.findOneAndUpdate({shopName:data.shopName},{$set:{"products.ammerpet":checkShop.products.ammerpet}},{new:true})
    }
    catch(err){

    }
  }



exports.fcnAllProductFunction={
fncAddProduct:fncAddProduct
}



















































































































































































































