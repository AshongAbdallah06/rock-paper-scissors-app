const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const {
	getHome,
	getScores,
	updateScores,
	getUserStats,
	getUserScore,
} = require("../controllers/gameController");
const router = Router();

router.get("/scores", getScores);

router.get("/score/:username", getUserScore);

router.patch("/scores/:username", updateScores);

router.get("/stats/:username", getUserStats);

router.get("/", requireAuth, getHome);

module.exports = router;
