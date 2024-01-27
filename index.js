require("dotenv").config();
require("./config/db");
const cors = require("cors");
const express = require("express");
const { PORT } = require("./EnvVariable");
const { errorHandler } = require("./middlewares/errorHandler.js");
const app = express();

const port = PORT || 8000;
const authRoute = require("./routes/auth.js");

app.use(cors({ origin: "http://localhost:3000/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
