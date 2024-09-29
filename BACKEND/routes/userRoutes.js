const { Router } = require("express");
const { signup, login, editProfile, getUserProfiles } = require("../controllers/userController");

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

router.patch("/edit/profile/:username", limiter, editProfile);
router.post("/profiles", limiter, getUserProfiles);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
