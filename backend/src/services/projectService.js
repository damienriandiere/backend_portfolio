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
    console.info("Project créé avec succès.");
  } catch (error) {
    console.error("Erreur durant la création d'un Project : ", error);
  }
}

async function updateProject(projectId, title, introductoryDescription, completeDescription, keywords, thumbnailImage, illustrationImages) {

  try {
    const project = await Project.findById(projectId);

    project.title = title;
    project.introductoryDescription = introductoryDescription;
    project.completeDescription = completeDescription;
    project.keywords = keywords;
    project.thumbnailImage = thumbnailImage;
    project.illustrationImages = illustrationImages;

    const updatedProject = await project.save();

    return updatedProject;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet :', error);
    throw new Error('Erreur lors de la mise à jour du projet :', error);
  }
}

async function deleteProject(id) {
  const project = await Project.findById(id);

  if (!project) {
    console.error("Project not found !");
    throw new Error("Project not found !");
  } else {
    await Project.deleteOne({ _id: id });
    console.info("Project deleted !");
    return { message: "Project deleted !" };
  }
}

async function getAnalytics() {
    const projects = await getAllProjects();
    const totalProjects = projects.length;

    if (totalProjects === 0) {
      return {
        totalProjects: 0,
        totalKeywords: 0,
        meanIntroductoryDescription: 0,
        meanCompleteDescription: 0,
      };
    }

    let totalKeywords = 0;
    projects.forEach((project) => {
      totalKeywords += project.keywords.length;
    });

    let meanIntroductoryDescription = 0;
    let meanCompleteDescription = 0;
    projects.forEach((project) => {
      meanIntroductoryDescription += project.introductoryDescription.length;
      meanCompleteDescription += project.completeDescription.length;
    });
    meanIntroductoryDescription = meanIntroductoryDescription / totalProjects;
    meanCompleteDescription = meanCompleteDescription / totalProjects;

    return {
      totalProjects,
      totalKeywords,
      meanIntroductoryDescription,
      meanCompleteDescription,
    };
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getAnalytics,
};
