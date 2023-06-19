const routes=(module.exports=require("express")());
const {newTickets}=require("../services/addNewTicketModel");


routes.post("/addNewTicket",async(req,res)=>{
    console.log(req.body.id,"addNewTicket route")
    try{
        const addticket=await newTickets.fcnAddNewTicket(req.body);
        res.send(addticket)

    }
    catch(err){
        res.send(err)
    }
});
routes.get("/getEmployeeTickets",async (req,res)=>{
console.log(req.body.id,"employeeId")
    try{
        const allTickets=await newTickets.fcnGetEmployeeTickets(req.body);
        res.send(allTickets)
    }
    catch(err){
        return err;
    }
})