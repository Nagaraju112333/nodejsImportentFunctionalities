let express=require("express");
const newTicketModel=require("../models/addNewTicketModel");
const nodemailer=require("nodemailer");
const e = require("express");


async function fcnAddNewTicket(data){
    try{
        var ticketNo = await Math.floor(100000 + Math.random() * 900000);
        if(data!=null || data==undefined){
        let newticket=await newTicketModel({
            issueType:data.issueType,
            priority:data.priority,
           // assignedPerson:data.assignedPerson,
            description:data.description,
            issueImage:data.issueImage,
            employeeId:data.id,
            date:new Date(),
            ticketNo:ticketNo
          })
          await newticket.save();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'support.tickets@archents.com',
            pass: 'dxeetecfvulpvnck'
            }
            });
            console.log(transporter,"transpoter")
            const mailOptions = {
            from: 'support.tickets@archents.com',
            to: "nagaraju.boda@archents.com",
            subject:'Ticket Status',
            text: data.firstName+" added new ticket "+"the ticket No: "+ticketNo
            };
            console.log(mailOptions,"mailoptions")
            transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
            } else {
            console.log('Email sent: ' + info.response);
             }
            });
          return ({message:"NewTicket added successfully done"})
        }
    }
    catch(err){
        return err
    }
}
async function fcnGetEmployeeTickets(data){
    // console.log(data,"data")
    try{
         if(data!=null || data!=undefined){
            let getAll=await newTicketModel.find({employeeId:data.id})
            console.log(getAll,"getall")
            if(getAll!=null || getAll==undefined){
                return getAll
            }
            else{
                return ({message:"no records..."})
            }
         }
         else{
            return ({message:"please fill the All fields"})
         }
         
    }
    catch(err){
        return err
     }
}
exports.newTickets={
    fcnAddNewTicket:fcnAddNewTicket,
    fcnGetEmployeeTickets:fcnGetEmployeeTickets
}