const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { getHome, getScores, updateScores } = require("../controllers/gameController");
const router = Router();

router.get("/scores", getScores);

router.patch("/scores/:username", updateScores);

router.get("/", requireAuth, getHome);

module.exports = router;
