const mongoose=require("mongoose");
const connection=require("../loaders/mongoose");
const newProduct=new mongoose.Schema({
    shopName:{type:String},
    products:{
        ammerpet:[
           {
            productName:{type:String},
            quantity:{type:Number,default:1},
            weight:{type:String},
            price:{type:String}
           }
        ],
        hitechcity:[
            {
                productName:{type:String},
                quantity:{type:Number,default:1},
                weight:{type:String},
                price:{type:String}   
            }
        ],
        secendrabad:[
            {
                productName:{type:String},
                quantity:{type:Number,default:1},
                weight:{type:String},
                price:{type:String}   
            }
        ]
    }
})
const newProductModel=connection.db1.model("newProductModel",newProduct);
module.exports=newProductModel