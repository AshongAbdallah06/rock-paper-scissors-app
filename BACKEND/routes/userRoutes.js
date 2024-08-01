const { Router } = require("express");
const { signup, getHome, login } = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", requireAuth, getHome);

module.exports = router;
