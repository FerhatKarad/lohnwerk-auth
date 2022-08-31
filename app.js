require("dotenv/config");

require("./db");

const express = require("express");

const { isAuthenticated } = require('./middleware/jwt.js')

const app = express();

require("./config")(app);


const auth = require("./routes/auth");
app.use("/auth", auth);



require("./error-handling")(app);

module.exports = app;
