const express = require('express');
const usersController = require('../controller/users-controller');
const router = express.Router();

router.get('/', usersController.verifyJWT, usersController.getAllUsers);
router.get('/:id', usersController.verifyJWT, usersController.getUserById);
router.get('/username/:username', usersController.verifyJWT, usersController.getUserByUsername);
router.post('/login', usersController.userLogin);
router.post('/', usersController.verifyJWT, usersController.createUser);
router.put('/:id', usersController.verifyJWT, usersController.attUser);
router.delete('/:id', usersController.verifyJWT, usersController.deleteUser);

module.exports = router;