const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();

//Routes Import
const authRoutes = require("./routes/auth.routes");

//Middleware
app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
