const express = require("express");
const route = express.Router();

const { userRegistration } = require("../controllers/userAuthRoute.js");
const validation = require("../middlewares/joiValidationMIddleware.js");
const { schemas } = require("../models/JoiValidationSchema.js");

route.post("/register", validation(schemas.registerSchema), userRegistration);

module.exports = route;
