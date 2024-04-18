const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");

const projectRoutes = express.Router();

projectRoutes.get("/", projectController.getAllProjects);
projectRoutes.get("/:id", projectController.getProjectById);
projectRoutes.post("/", authMiddleware, projectController.createProject);
projectRoutes.put("/:id", authMiddleware, projectController.updateProject);
projectRoutes.delete("/:id", authMiddleware, projectController.deleteProject);
projectRoutes.get("/analytics", projectController.getAnalytics);

module.exports = projectRoutes;
