const router = require("express").Router();
const {
  getDogs,
  getDogById,
  createDog,
} = require("../controllers/Dogs.controller");

router.get("/", getDogs);
router.get("/:idRaza", getDogById);

router.post("/", createDog);

module.exports = router;
