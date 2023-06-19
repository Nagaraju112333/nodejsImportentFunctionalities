const express = require("express");
const expressJWT = require("express-jwt");
const bearerToken = require("express-bearer-token");
var jwt = require("jsonwebtoken");
const CONFIG = require("./dotenv");
const app = require("./express");
const logger = require("./logger");
const pathToRegexp = require("path-to-regexp");

// app.set("secret", CONFIG.JWT_SECRET);


app.use(bearerToken());
exports.authorization = async (req, res, next) => {
  //console.log(req.originalUrl.indexOf("/register"), "**");
  logger.info(" New request for  " + req.originalUrl);
  let string = req.originalUrl;
  if (req.originalUrl.indexOf("/login") >= 0) {
    return next();
   }else if (req.originalUrl.indexOf("/newRegister") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/userLogin") >= 0) {
    return next();
  } 
 
  else if (req.originalUrl.indexOf("/searchByname") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/serarchProduct") >= 0) {
    return next();

  } 
  
  else if (req.originalUrl.indexOf("/addcatogery") >= 0) {
    return next();
  } 
 
  else if (req.originalUrl.indexOf("/search") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/getall") >= 0) {
    return next();
  } 
 
  else if (req.originalUrl.indexOf("/getUserByID") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/deleteUser") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/updateUsers") >= 0) {
    return next();
  } 
  
  else if (req.originalUrl.indexOf("/userLoginWithOTP") >= 0) {
    return next();
  } 
  else if (req.originalUrl.indexOf("/verifyOtpLogin") >= 0) {
    return next();
  } 
 
  else if (req.originalUrl.indexOf("/forgotPassword") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/sendmail") >= 0) {
    return next();
  }
 
  else if (req.originalUrl.indexOf("/newRegitser") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/adminLogin") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/adminApproval") >= 0) {
    return next();
  }

  else if (req.originalUrl.indexOf("/dropdownList") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/getemployeeBydropDownList") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/employeeRegitser") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/getAdminEmails") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/regitserUserWithadminid") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/loginemp") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/Ulogin") >= 0) {
    return next();
  }
 
  else if (req.originalUrl.indexOf("/forgotPassword") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/verifyOtp") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/stakeHolderRegister") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/empDeptRegister") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/updateDept") >= 0) {
    return next();
  }
 
  else if (req.originalUrl.indexOf("/deleteDept") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getEmpInfo") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/empRegisterWithMultipleDepartment") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/collageRegister") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addStudentMarks") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/updateMarks") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addNewProduct") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addNewPatient") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/updatePatientDetaisl") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getPatientInfo")>= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/deletePatientDetails") >= 0) {
    return next();
  }
  
  else if (req.originalUrl.indexOf("/addPatientDisease") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/matchFunction") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/aggregations") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addUniversities") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getuniversities") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/project") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/group") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/out") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/unwind") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/sort") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addNewCource") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/lookup") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/lookUpdata") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/practiceLookUpData") >= 0) {
    return next();
  }
  

  else if (req.originalUrl.indexOf("/admitNewPatient") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getallPatients") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getPatientInfoDetails") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/getpatient") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/updatePatientDetails") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/deletePatient") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/addPatientDisease") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/adddisease") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/deleteDisease") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/aggregations") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/aggregateRoute") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/secondPatientDisease") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/deletediseasesObject") >= 0) {
    return next();
  }
  else if (req.originalUrl.indexOf("/groupWiseGetData") >= 0) {
    return next();
  }

  
  var token = req.token;
  jwt.verify(token, app.get("secret")|| 'default-secret-key', async function (err, decoded) {
    //console.log(err)
    if (err) {
      res.status(401).send({
        success: false,
        code: 401,
        message:
          "Failed to authenticate token. Make sure to include the " +
          "token returned from login in the authorization header " +
          " as a Bearer token",
      });
      return;
    } else {
        console.log(decoded)
        req.exp = decoded.exp;
        req.id = decoded.id;
        req.body.id = decoded.id;
        req.body.UName = decoded.username;
        req.empID = decoded.empID;
        req.designation = decoded.role;
        //console.log(req.id,req.body.id)
        // req._id=decoded._id;
        logger.info(
          "Decoded from JWT token: username - " +
            decoded.username +
            ", expiry - " +
            decoded.exp +
            ",ID - " +
          decoded.id +
          ", Designation - " +
          decoded.role +
          ", employeeD - " +
          decoded.employeeD
        );
        next();
      }
  });
};