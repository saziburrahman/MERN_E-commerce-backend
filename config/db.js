const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGOURI);
  console.log("DB Coonected");
} catch (error) {
  console.log(error);
}

module.exports = mongoose;
