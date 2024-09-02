const prisma = require("../../db");

const findProjectRepo = async (projectId) => {
  return await prisma.project.findUnique({
    where: {
      id: parseInt(projectId),
    },
  });
}

const getListProjectRepo = async () => {
  return await prisma.project.findMany();
}

const createProjectRepo = async (name, description) => {
  return await prisma.project.create({
    data: {
      name,
      description,
    },
  });
}

const updateProjectRepo = async (id, name, description) => {
  return await prisma.project.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      description,
    },
  });
}

const deleteProjectRepo = async (id) => {
  return await prisma.project.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  findProjectRepo,
  getListProjectRepo,
  createProjectRepo,
  updateProjectRepo,
  deleteProjectRepo,
};