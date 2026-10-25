const express = require("express");
const cookieParser = require('cookie-parser')
const verifyOrigin = require('./middleware/verifyOrigin')
const app = express();

//Routes Import
const authRoutes = require("./routes/auth.routes");

//Middleware
app.use(express.json());
app.use(cookieParser())
app.use(verifyOrigin)

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
