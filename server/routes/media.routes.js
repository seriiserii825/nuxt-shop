const { Router } = require("express");
const router = Router();
const { fetch, remove, create } = require("./../controllers/media.controller");
const upload = require("./../middleware/upload");

router.post("/", upload.array("images", 4), create);
router.get("/", fetch);
router.delete("/:title", remove);

module.exports = router;
