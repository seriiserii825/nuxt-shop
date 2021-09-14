const { Router } = require("express");
const router = Router();
const {
  create,
  fetch,
  remove,
  update,
  getById
} = require("./../controllers/product.controller");
const upload = require("./../middleware/upload");

router.post("/", upload.single("image"), create);
router.patch("/:id", upload.single("image"), update);
router.get("/:id", getById);
router.get("/", fetch);
router.delete("/:id", remove);

module.exports = router;
