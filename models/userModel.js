const mongoose = require("mongoose");

const userSchemaModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required:true,
      unique: true,
    },
    password: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchemaModel);
