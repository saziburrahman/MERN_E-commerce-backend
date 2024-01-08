const expressAsyncHandler = require("express-async-handler");
const userSchemaModel = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");

const userRegistration = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const saltPass = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, saltPass);
    const formData = new userSchemaModel({
      name,
      email,
      password: hashPassword,
    });
    await formData.save();
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  userRegistration,
};
