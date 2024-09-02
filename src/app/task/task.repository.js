const { parse } = require('path')
const prisma = require('../../db')

const getListTaskRepo = async () => {
  return await prisma.task.findMany()
}

const findTaskRepo = async (id) => {
  return await prisma.task.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

const createTaskRepo = async ({ name, description, projectId, userId }) => {
  return await prisma.task.create({
    data: {
      name,
      description,
      projectId: parseInt(projectId),
      userId: parseInt(userId)
    }
  })
}

const updateTaskRepo = async (id, { name, description, isDone }) => {
  return await prisma.task.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name,
      description,
      isDone: parseInt(isDone)
    }
  })
}

const deleteTaskRepo = async (id) => {
  return await prisma.task.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  getListTaskRepo,
  findTaskRepo,
  createTaskRepo,
  updateTaskRepo,
  deleteTaskRepo
}