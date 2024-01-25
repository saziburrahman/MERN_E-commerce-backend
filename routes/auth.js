const express = require("express");
const route = express.Router();

const { userRegistration, userLogin } = require("../controllers/userAuthRoute.js");
const validation = require("../middlewares/joiValidationMIddleware.js");
const { schemas } = require("../models/JoiValidationSchema.js");

route.post("/register", validation(schemas.registerSchema), userRegistration);
route.post("/login", validation(schemas.loginSchema), userLogin);

module.exports = route;
