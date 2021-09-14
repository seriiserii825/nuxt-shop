const { Router } = require("express");
const router = Router();
const {
  create,
  fetchTipo,
  remove,
  getById,
  update
} = require("./../controllers/tipo.controller");

router.post("/", create);
router.get("", fetchTipo);
router.get("/:id", getById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
