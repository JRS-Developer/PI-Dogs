const router = require("express").Router();
const { getTemperaments } = require("../controllers/Temperament.controller");

router.get("/", getTemperaments);

module.exports = router;
