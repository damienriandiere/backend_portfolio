const projectService = require("../services/projectService");

async function getAllProjects(req, res) {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProjectById(req, res) {
  const projectId = req.params.id;
  try {
    const project = await projectService.getProjectById(projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProject(req, res) {
  const title = req.body.title;
  const introductoryDescription = req.body.introductoryDescription;
  const completeDescription = req.body.completeDescription;
  const keywords = req.body.keywords;
  const thumbnailImage = req.body.thumbnailImage;
  const illustrationImages = req.body.illustrationImages;
  try {
    const newProject = await projectService.createProject(
      title,
      introductoryDescription,
      completeDescription,
      keywords,
      thumbnailImage,
      illustrationImages
    );
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateProject(req, res) {
  const projectId = req.params.id;
  const title = req.body.title;
  const introductoryDescription = req.body.introductoryDescription;
  const completeDescription = req.body.completeDescription;
  const keywords = req.body.keywords;
  const thumbnailImage = req.body.thumbnailImage;
  const illustrationImages = req.body.illustrationImages;
  console.log(req.body)
  if (!projectId || !title || !introductoryDescription || !completeDescription || !keywords || !thumbnailImage || !illustrationImages) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  try {
    const updatedProject = await projectService.updateProject(
      projectId,
      title,
      introductoryDescription,
      completeDescription,
      keywords,
      thumbnailImage,
      illustrationImages
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteProject(req, res) {
  const projectId = req.params.id;
  try {
    await projectService.deleteProject(projectId);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAnalytics(req, res) {
  try {
    const analytics = await projectService.getAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAnalytics,
};
