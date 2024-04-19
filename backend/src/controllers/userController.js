const userServices = require("../services/userService");

async function createUser(req, res) {
  try {
    const { name, email, password, status } = req.body;
    console.info("New user creation... : " + name + " " + email);
    const newUser = await userServices.createUser(
      name,
      email,
      password,
      status
    );
    console.info("New user created !");
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.user;

    const result = await userServices.deleteUser(id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  createUser,
  deleteUser,
};
