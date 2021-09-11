const { Router } = require("express");
const router = Router();
const { login, user, logout } = require("./../controllers/auth.controller");

router.post("/api/auth/login", login);
router.get("/api/auth/user", user);
router.post("/api/auth/logout", logout);

module.exports = router;
