const express = require ("express");
const AuthController = require ("../controllers/authControllers.js");

const router = express.Router();

const authController = AuthController();

router.post("/register", authController.userRegistration);
router.post("/login", authController.userLogin);

module.exports = router;
