const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { getHome, getUserStats } = require("../controllers/gameController");
const router = Router();

router.get("/stats/:username", getUserStats);

router.get("/", requireAuth, getHome);

module.exports = router;
