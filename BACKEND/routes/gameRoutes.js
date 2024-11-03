const { Router } = require("express");
const {
	getHome,
	getUserStats,
	getPlayerStats,
	getUserDualPlayerStats,
} = require("../controllers/gameController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/stats/:username", getUserStats);
router.get("/stats/dual-player/:username", getUserDualPlayerStats);
router.post("/stats", getPlayerStats);

router.get("/", requireAuth, getHome);

module.exports = router;
