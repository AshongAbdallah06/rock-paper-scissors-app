const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const {
	getHome,
	getUserStats,
	getPlayerStats,
	getUserDualPlayerStats,
} = require("../controllers/gameController");
const router = Router();

router.get("/stats/:username", getUserStats);
router.get("/stats/dual-player/:username", getUserDualPlayerStats);
router.post("/stats", getPlayerStats);

router.get("/:username", requireAuth, getHome);

module.exports = router;
