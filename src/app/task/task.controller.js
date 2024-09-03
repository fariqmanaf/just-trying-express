const express = require('express');
const router = express.Router();

const { getListTasksService, findTaskService, createTaskService, updateTaskService, deleteTaskService } = require("./task.service");
const authMiddleware = require('../../middleware/auth');
const verifyProject = require("../../utils/handler/projectHandler");
const taskValidator = require("./task.validator");
const { task } = require('../../db');

router.get("/:projectId/tasks", authMiddleware, verifyProject, getListTasksService);
router.get("/:projectId/tasks/:id", authMiddleware, verifyProject, findTaskService);
router.post("/:projectId/tasks", authMiddleware, taskValidator, verifyProject, createTaskService);
router.put("/:projectId/tasks/:id", authMiddleware, taskValidator, verifyProject, updateTaskService);
router.delete("/:projectId/tasks/:id", authMiddleware, verifyProject, deleteTaskService);

module.exports = router;