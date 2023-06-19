const mongoose=require("mongoose");
const connection=require("../loaders/mongoose")

const newAddTicketSchema=new mongoose.Schema({
    issueType:{type:String},
    priority:{type:String},
    assignedPerson:{type:String},
    description:{type:String},
    issueImage:{type:String},
    employeeId:{type:String},
    date:{type:String},
    ticketNo:{type:Number}
      
})
const newTicketModel=connection.db1.model("newTicketModel",newAddTicketSchema)
module.exports=newTicketModel;