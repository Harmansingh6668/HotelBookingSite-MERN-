const express = require("express");
const userController = require("./user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, allowRoles("SUPER_ADMIN"), userController.getUsers);

router.get("/email/:email", authMiddleware,  allowRoles("SUPER_ADMIN"), userController.getUserByEmail);

router.get("/role/:role",  authMiddleware,  allowRoles("SUPER_ADMIN"), userController.getUsersByRole);

router.get("/:id",  authMiddleware, userController.getUser);

module.exports = router;