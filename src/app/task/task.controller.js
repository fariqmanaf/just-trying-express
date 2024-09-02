const express = require('express');
const router = express.Router();

const { getListTasksService, findTaskService, createTaskService, updateTaskService, deleteTaskService } = require("./task.service");
const authMiddleware = require('../../middleware/auth');
const verifyProject = require("../../utils/handler/projectHandler");

router.get("/:projectId/tasks", authMiddleware, verifyProject, getListTasksService);
router.get("/:projectId/tasks/:id", authMiddleware, verifyProject, findTaskService);
router.post("/:projectId/tasks", authMiddleware, verifyProject, createTaskService);
router.put("/:projectId/tasks/:id", authMiddleware, verifyProject, updateTaskService);
router.delete("/:projectId/tasks/:id", authMiddleware, verifyProject, deleteTaskService);

module.exports = router;