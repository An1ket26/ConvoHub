const express = require("express");
const authController = require("../components/auth/authController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth=require('../middleware/auth')

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const router = express.Router();

router.post(
  "/register",
  validator.body(registerSchema),
  authController.controller.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authController.controller.postLogin
);

//test route
router.get('/test',auth,(req,res)=>{
  console.log(req.user);
  return res.send("request passed");
})

module.exports = router;
