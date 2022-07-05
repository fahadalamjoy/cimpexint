const express = require("express");
const UserModel = require("../models/userModel");
const otpModel = require("../models/OtpModel");
const router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joy.lightscommunication@gmail.com',
    pass: 'tfdrwbzqcbdjafwm'
  }
});


router.post("/otp", async (req, res) => {
  try {
    
    const user = await otpModel.findOne({
      otp: req.body.otp,
      
    });
    if (user) res.send(user);
    else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: false,
    });
    if (user) res.send(user);
    else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    // const reqBody = req.email
    // console.log(reqBody)
    const newUser = new UserModel({ ...req.body, verified: false });
    await newUser.save()

    const { email } = req.body

    const otp = `${Math.floor(1000+Math.random()*9000)}`
    var mailOptions = {
      from: 'joy@obnware.com',
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter ${otp} in the login page</p>`
    };

    const newOtpVarifiaction = await new otpModel({
      otp: otp
    })
    await newOtpVarifiaction.save()
    await transporter.sendMail(mailOptions)
    res.json({
      status:'Pending',
      message:"Verification otp email sent",
      data:{
        email
      }
    })



  } catch (error) {
    res.status(400).json(error);
  }
});

// ---------------------nodemailer---------------------

// const sendOTPVarification = async(email)=>{
//   try{
//     const otp = `${Math.floor(1000+Math.random()*9000)}`
//     var mailOptions = {
//       from: 'joy@obnware.com',
//       to: email,
//       subject: 'Verify Your Email',
//       html: `<p>Enter ${otp} in the login page</p>`
//     };

//     const newOtpVarifiaction = await new otpModel({
//       otp: otp
//     })
//     await newOtpVarifiaction.save()
//     await transporter.sendMail(mailOptions)
//     res.json({
//       status:'Pending',
//       message:"Verification otp email sent",
//       data:{
//         email
//       }
//     })

//   } catch(error){
//     res.json({
//       status:'Failed',
//       message:error.message
//     })
//   }
// }







module.exports = router;
