const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const {
	getHome,
	getUserStats,
	getPlayerStats,
	getUserDualPlayerStats,
} = require("../controllers/gameController");
const router = Router();

const rateLimit = require("express-rate-limit");

// Create a rate limiter for 3 request per minute
const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 3, // Limit each IP to 3 request per windowMs
	message: "You can only make 1 request per minute. Please try again later.",
	standardHeaders: true,
	legacyHeaders: false,
});

router.get("/stats/:username", getUserStats);
router.get("/stats/dual-player/:username", getUserDualPlayerStats);
router.post("/stats", limiter, getPlayerStats);

router.get("/:username", requireAuth, getHome);

module.exports = router;
