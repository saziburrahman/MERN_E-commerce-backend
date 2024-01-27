const mongoose = require("mongoose");
const { MONGOURI } = require("../EnvVariable.js");

try {
  mongoose.connect(MONGOURI);
  console.log("DB Coonected");
} catch (error) {
  console.error(error);
}

module.exports = mongoose;
