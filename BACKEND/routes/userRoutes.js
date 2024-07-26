const { Router } = require("express");
const { signup, getHome, login } = require("../controllers/userController");

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", getHome);

module.exports = router;
