const asyncHandler = require("../../utils/handler/asyncHandler");
const { findProjectRepo } = require("../../app/project/project.repository");

const verifyProject = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  const project = await findProjectRepo(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  req.project = project;
  next();
});

module.exports = verifyProject;