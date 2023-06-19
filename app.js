const app = require("./loaders/express");
//const routes=require('./routers')
const CONFIG = require("./loaders/dotenv");
const logger = require("./loaders/logger");
 const handleAsyncExceptions = require("./loaders/handleError");
 const routes=require('./routers')
 const {authorization}=require("./loaders/jwt")
 const bearerToken = require("express-bearer-token");
// const routes = require("./routes");
// const bearerToken = require("express-bearer-token");
//onst expressJWT = require("express-jwt");
// const pathToRegexp = require("path-to-regexp");
// const { authorisation } = require("./loaders/jwt");
// ///////////////
/////////////
const unprotected = [
  //pathToRegexp("/login"),
  //pathToRegexp("/favicon.ico"),
  "/newRegister",
  "/login",
  "/userLogin",
  "/searchByname",
  "/serarchProduct",
  "/addcatogery",
  "/search",
  "/getall",
  "/getUserByID",
  "/deleteUser",
"/updateUsers",
"/userLoginWithOTP",
"/verifyOtpLogin",
"/forgotPassword",
"/sendmail",
"/newRegitser",
"/adminLogin",
"/adminApproval",
"/dropdownList",
"/getemployeeBydropDownList",
"/employeeRegitser",
"/getAdminEmails",
"/regitserUserWithadminid",
"/loginemp",
"/getUserDetails",
"/Ulogin",
"/forgotPassword",
"/verifyOtp",
"/stakeHolderRegister",
"/empDeptRegister",
"/updateDept",
"/deleteDept",
"/getEmpInfo",
"/empRegisterWithMultipleDepartment",,
"/collageRegister",
"/addStudentMarks",
"/updateMarks",
"/addNewProduct",
"/addNewPatient",
"/updatePatientDetaisl",
"/getPatientInfo",
"/deletePatientDetails",
"/addPatientDisease",
"/matchFunction",
"/aggregations",
"/addUniversities",
"/getuniversities",
"/project",
"/group",
"/out",
"/unwind",
"/sort",
"/addNewCource",
"/lookup",
"/lookUpdata",
"/practiceLookUpData",
"/admitNewPatient",
"/getallPatients",
"/getPatientInfoDetails",
"/getpatient",
"/updatePatientDetails",
"/deletePatient",
"/addPatientDisease",
"/adddisease",
"/deleteDisease",
"/aggregations",
"/aggregateRoute",
"/secondPatientDisease",
"/deletediseasesObject",
"/groupWiseGetData"
];



/**Express server starts here */
async function run() {
  try {
    // app.use(
    //   expressJWT({
    //     secret: CONFIG.JWT_SECRET,
    //     algorithms: ["HS256"],
    //   }).unless({
    //     path: unprotected,
    //   })
    // );
    // app.use(httpLogger);
    app.use(bearerToken());
    app.use(authorization);
app.use(routes);
    // Starting server and listening at port defined in .env file
    app.listen(CONFIG.EXPRESS_PORT, CONFIG.EXPRESS_HOST, function (err) {
      if (err) {
        logger.error("Failed to start the server " + err);
      }
      logger.info(
        "Archents portal Module is running on http://" +
          CONFIG.EXPRESS_HOST +
          ":" +
          CONFIG.EXPRESS_PORT
      );
    });
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}

//////////////////
module.exports = run;
if (require.main === module) {
  handleAsyncExceptions();
  run();
}


