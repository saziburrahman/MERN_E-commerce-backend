require("dotenv").config();
require("./config/db")
const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler.js");
const app = express();
const port = process.env.PORT || 8000;
const authRoute = require("./routes/auth.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

app.use(errorHandler)
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
