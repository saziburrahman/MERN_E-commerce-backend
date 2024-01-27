const expressAsyncHandler = require("express-async-handler");
const userSchemaModel = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../EnvVariable.js");

const userRegistration = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userInfo = await userSchemaModel.findOne({ email });
  if (userInfo) {
    res.status(409);
    throw new Error("Email already registered");
  }
  try {
    const saltPass = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, saltPass);
    const formData = new userSchemaModel({
      name,
      email,
      password: hashPassword,
    });
    await formData.save();
    const userDetails = { ...formData };
    await delete userDetails._doc.password;
    res.status(201).json(userDetails._doc);
  } catch (error) {
    res.status(503);
    throw new Error(error.message);
  }
});

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await userSchemaModel.findOne({ email });
    if (!userInfo) {
      res.status(401);
      throw new Error("Email or Password not correct");
    }
    const isPasswordMatch = await bcryptjs.compare(password, userInfo.password);
    if (!isPasswordMatch) {
      res.status(401);
      throw new Error("Email or Password not correct");
    }
    const token = jwt.sign({ username: userInfo.email }, secretKey, {
      expiresIn: "1h",
    });

    const userDetails = { ...userInfo };
    await delete userDetails._doc.password;
    res.status(200).json({ userDetails: userDetails._doc, token });
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const homepage = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = {
  userRegistration,
  userLogin,
  homepage,
};
