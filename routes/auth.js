const express = require("express");
const route = express.Router();
const { verifyToken } = require("../middlewares/JwtTokenVerify.js");

const {
  userRegistration,
  userLogin,
  homepage,
} = require("../controllers/userAuthController.js");
const validation = require("../middlewares/joiValidationMIddleware.js");
const { schemas } = require("../models/JoiValidationSchema.js");

route.post("/register", validation(schemas.registerSchema), userRegistration);
route.post("/login", validation(schemas.loginSchema), userLogin);
route.get("/home", verifyToken, homepage);

module.exports = route;
