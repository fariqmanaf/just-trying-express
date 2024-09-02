const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth');
const { findProjectService, getListProjectService, createProjectService, updateProjectService, deleteProjectService } = require('./project.service');
const { projectValidator } = require('./project.validator');

router.get('/', authMiddleware, getListProjectService);
router.get('/:id', authMiddleware, findProjectService);
router.post('/create', authMiddleware, projectValidator, createProjectService);
router.put('/edit/:id', authMiddleware, projectValidator, updateProjectService);
router.delete('/delete/:id', authMiddleware, deleteProjectService);

module.exports = router;