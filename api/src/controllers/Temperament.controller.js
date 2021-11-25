const axios = require("axios");
const { breedsQ } = require("../../data/api");
const { Temperament } = require("../db");
const { getSeparatedTemps, removeRepeated } = require("../helpers/index");

const getTemperaments = async (_req, res, next) => {
  try {
    const temperaments = await Temperament.findAll({
      attributes: ["id", "name"],
    });

    // if there is not temperaments in the database, the use the api to get the temperaments, return it to the client and save it in the database for the next use.
    if (!temperaments.length) {
      let query = breedsQ;
      const { data: breedsApi } = await axios.get(query);

      let newTemperaments = getSeparatedTemps(breedsApi);

      newTemperaments = removeRepeated(newTemperaments);
      // convert in a object to can save them in the database
      newTemperaments = newTemperaments.map((temp, i) => ({
        id: i + 1,
        name: temp,
      }));
      res.json(newTemperaments);
      // Save the new Temperaments from the api
      await Temperament.bulkCreate(newTemperaments);
      return;
    }
    // else return the temperaments of the database
    return res.json(temperaments);
  } catch (e) {
    next(e);
  }
};

module.exports = { getTemperaments };
