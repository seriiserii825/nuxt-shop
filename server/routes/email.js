const { Router } = require("express");
const router = Router();
const { email } = require("./../controllers/email");

router.post("/api/", email);

module.exports = router;
