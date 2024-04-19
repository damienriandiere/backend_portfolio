const authService = require("../services/authService");

async function register(req, res) {
  try {
    const { name, email, password, admin } = req.body;
    console.info("New user creation... : " + name + " " + email + " " + admin);
    const newUser = await authService.register(name, email, password, admin);
    console.info("New user created !");
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const tokens = await authService.login(email, password);
    console.info("User logged in !");
    res.status(200).json({ success: true, tokens });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;

    const tokens = authService.refresh(refreshToken);
    console.info("Tokens refreshed !");
    res.status(200).json({ success: true, tokens });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  register,
  login,
  refresh,
};
