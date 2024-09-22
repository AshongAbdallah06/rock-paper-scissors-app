const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { getHome, getUserStats, getPlayerStats } = require("../controllers/gameController");
const router = Router();

router.get("/stats/:username", getUserStats);
router.post("/stats", getPlayerStats);

router.get("/:username", requireAuth, getHome);

module.exports = router;
