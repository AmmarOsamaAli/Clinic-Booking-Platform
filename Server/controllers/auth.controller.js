const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, Email, and Password are required" });

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    )
      return res
        .status(400)
        .json({ message: "Name, Email, and Password should be a valid Text" });

    if (email.trim() === "" || name.trim() === "")
      return res
        .status(400)
        .json({ message: "Text cannot contain only whitespace" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const trueEmail = email.toLowerCase().trim();

    if (!emailRegex.test(trueEmail))
      return res
        .status(400)
        .json({ message: "Please use a valid email address" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters!" });

    const user = await User.create({
      name,
      email: trueEmail,
      hashedPassword: await bcrypt.hash(password, 12),
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email Already Exists" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email or Password are Required" });

    if (typeof email !== "string" || typeof password !== "string")
      return res
        .status(400)
        .json({ message: "Email or Password should be a valid Text" });

    if (email.trim() === "")
      return res
        .status(400)
        .json({ message: "Email cannot contain only whitespace" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid Credentials" });

    if (user.isBlocked)
      return res
        .status(403)
        .json({ message: "This User is Blocked and Can't Log in" });

    const payload = { email: user.email, _id: user._id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
      path: "/",
    });

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logOut(req, res) {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({message: "Logout Successful"})

  } catch (error) {
    return res.status(500).json({message: "Internal Server Error"})
  }
}

async function verifyUser(req, res) {
  try {
    const user = await User.findById(req.user._id);

    return res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { signUp, signIn, logOut, verifyUser };
