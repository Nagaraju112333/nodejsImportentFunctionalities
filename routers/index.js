const app=(module.exports=require("express")())

app.use("/",require("./userRegister"))
app.use("/",require("./archentsUserRegister"))
app.use("/",require("./catogeryModel"))
app.use("/",require("./employeeMOdel"))
app.use("/",require("./ArchentsfcnModel"))
app.use("/",require("./addNewTicketModel"))
app.use("/",require("./empDeptModel"))
app.use("/",require("./collage"));
app.use("/",require("./productModel"))
app.use("/",require("./patientDetails"));
app.use("/",require("./universities"));
app.use("/",require("./coursesModel"));
app.use("/",require("./patientSecondModel"));
