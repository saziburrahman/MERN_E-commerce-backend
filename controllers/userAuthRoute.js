const expressAsyncHandler = require("express-async-handler");
const userSchemaModel = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");

const userRegistration = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userInfo = await userSchemaModel.findOne({ email });
  if (userInfo) {
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
    res.status(200).json(userDetails._doc);
  } catch (error) {
    throw new Error(error.message);
  }
});

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await userSchemaModel.findOne({ email });
    console.log(userInfo);
    if (!userInfo) {
      throw new Error("Email or Password not correct");
    }
    const isPasswordMatch = await bcryptjs.compare(password, userInfo.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new Error("Email or Password not correct");
    }
    const userDetails = { ...userInfo };

    console.log(userDetails._doc);
    await delete userDetails._doc.password;
    res.status(200).json(userDetails._doc);
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = {
  userRegistration,
  userLogin,
};
