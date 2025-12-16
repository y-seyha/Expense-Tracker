const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //validation : Check for missing field
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are require!" });
  }

  try {
    //check if email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    //Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Registering User", error: error.message });
  }
};

//Login User
exports.loginUser = async (req, res) => {};

//getUserInfo
exports.getUserInfo = async (req, res) => {};
