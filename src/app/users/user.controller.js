const express = require('express');
const router = express.Router();
const upload = require('../../utils/handler/imageHandler');

const { getListUsersService, getUserByIdService, updateUserService, deleteUserByIdService } = require('./user.service');
const { updateUserValidator } = require('./user.validator');
const authMiddleware = require('../../middleware/auth');

router.get('/', authMiddleware, getListUsersService);
router.get('/:id', authMiddleware, getUserByIdService);
router.put('/edit/:id', authMiddleware, upload.single('photo'), updateUserValidator, updateUserService);
router.delete('/delete/:id', authMiddleware, deleteUserByIdService);

module.exports = router;