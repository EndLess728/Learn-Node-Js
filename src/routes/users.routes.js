const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/users", usersController.getUsers);
router.get("/users/:id", usersController.getUser);
router.get("/users/:id/details", usersController.getUserDetails);
router.post("/users", usersController.createUser);
router.patch("/users/:id", usersController.updateUser);
router.patch("/users/:id/details", usersController.updateUserDetails);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
