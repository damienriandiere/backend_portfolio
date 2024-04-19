const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");

const projectRoutes = express.Router();

projectRoutes.get("/", projectController.getAllProjects);
projectRoutes.post("/", authMiddleware, projectController.createProject);
projectRoutes.get("/analytics", authMiddleware, projectController.getAnalytics);
projectRoutes.get("/:id", projectController.getProjectById);
projectRoutes.put("/:id", authMiddleware, projectController.updateProject);
projectRoutes.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = projectRoutes;
