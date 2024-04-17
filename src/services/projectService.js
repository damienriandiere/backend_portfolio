const Project = require("../models/projectModel");

const getAllProjects = async () => {
  try {
    return await Project.find();
  } catch (error) {
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    return await Project.findById(id);
  } catch (error) {
    throw error;
  }
};

async function createProject(
  title,
  introductoryDescription,
  completeDescription,
  keywords,
  thumbnailImage,
  illustrationImages
) {
  try {
    const newProject = new Project({
      title: title,
      introductoryDescription: introductoryDescription,
      completeDescription: completeDescription,
      keywords: keywords,
      thumbnailImage: thumbnailImage,
      illustrationImages: illustrationImages,
    });
    await newProject.save();
    logger.info("Project créé avec succès.");
  } catch (error) {
    logger.error("Erreur durant la création d'un Project : ", error);
  }
}

const updateProject = async (id) => {
  try {
    return await Project.findByIdAndUpdate(id, projectData, { new: true });
  } catch (error) {
    throw error;
  }
};

async function deleteProject(id) {
  const project = await Project.findById(id);

  if (!project) {
    logger.error("Project not found !");
    throw new Error("Project not found !");
  } else {
    await Project.deleteOne({ _id: id });
    logger.info("Project deleted !");
    return { message: "Project deleted !" };
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
