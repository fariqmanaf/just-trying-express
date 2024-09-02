const asyncHandler = require("../../utils/handler/asyncHandler");

const { findProjectRepo, getListProjectRepo, createProjectRepo, updateProjectRepo, deleteProjectRepo } = require("./project.repository");

const getListProjectService = asyncHandler(async(req, res) => {
    const projects = await getListProjectRepo();

    if(projects.length === 0) {
        return res.status(404).json({ message: "Projects not found" });
    }

    return res.status(200).json(projects);
});

const findProjectService = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const project = await findProjectRepo(id);

    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
});

const createProjectService = asyncHandler(async(req, res) => {
    const { name, description } = req.body;

    const project = await createProjectRepo(name, description);

    return res.status(201).json(project);
});

const updateProjectService = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    const project = await findProjectRepo(id);

    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await updateProjectRepo(id, name, description);

    return res.status(200).json(updatedProject);
});

const deleteProjectService = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const project = await findProjectRepo(id);

    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    const deletedProject = await deleteProjectRepo(id);

    return res.status(204).json(deletedProject);
});

module.exports = {
    findProjectService,
    getListProjectService,
    createProjectService,
    updateProjectService,
    deleteProjectService
};