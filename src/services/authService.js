const jwt = require("jsonwebtoken");
const userServices = require("./userService");
const authUtils = require("../utils/authUtils");
const User = require("../models/userModel");
const isEmailValid = require("../utils/validators");
const dotenv = require("dotenv");

async function register(name, email, password, admin) {
  if (
    name === undefined ||
	name === "" ||
    email === undefined ||
	email === "" ||
    password === undefined ||
	password === "" ||
    admin === undefined
  ) {
    console.error("Missing parameters !");
    throw new Error("Missing parameters !");
  }

  if (!isEmailValid(email)) {
    console.error(
      "Email is not valid ! Please respect this format : example@example.example"
    );
    throw new Error(
      "Email is not valid ! Please respect this format : example@example.example"
    );
  }

  const findUser = await User.findOne({ email: email });

  if (findUser) {
    console.error("User already exists !");
    throw new Error("User already exists !");
  }

  const hashedPassword = await authUtils.hashPassword(password);
  console.info("Password hashed !");

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    admin: admin,
  });
  console.info("User created !");

  await newUser.save();
  console.info("User saved !");

  const userProfile = await userServices.getUserProfile(newUser._id);

  return { ...authUtils.createTokens(userProfile), userProfile };
}

function refresh(refreshToken) {
  const secretKey = process.env.REFRESH_KEY_SECRET;
  const user = jwt.verify(refreshToken, secretKey);

  return authUtils.createTokens(user);
}

async function login(email, password) {
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    console.error("User not found !");
    throw new Error("User not found !");
  }

  const isMatch = await authUtils.comparePassword(password, findUser.password);
  console.info("Passwords compared !");

  if (!isMatch) {
    console.error("Incorrect password !");
    throw new Error("Incorrect password !");
  }

  const userProfile = await userServices.getUserProfile(findUser._id);

  return { ...authUtils.createTokens(userProfile), userProfile };
}

module.exports = {
  register,
  login,
  refresh,
};
