const { Router } = require("express");
const { signup, login, editProfile, getUserProfiles } = require("../controllers/userController");

const router = Router();

router.patch("/edit/profile/:username", editProfile);
router.post("/profiles", getUserProfiles);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
