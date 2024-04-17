const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

function createTokens(user) {
  const accessKey = process.env.ACCESS_KEY_SECRET;
  const refreshKey = process.env.REFRESH_KEY_SECRET;

  const accessToken = jwt.sign({ user }, accessKey, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ user }, refreshKey, { expiresIn: "2h" });

  return { accessToken, refreshToken };
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.info("Salt generated");

  const hashedPassword = await bcrypt.hash(password, salt);
  console.info("Password hashed");

  return hashedPassword;
}

async function comparePassword(candidatePassword, userPassword) {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);

  return isMatch;
}

module.exports = {
  createTokens,
  hashPassword,
  comparePassword,
};
