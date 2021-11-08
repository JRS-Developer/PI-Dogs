const router = require("express").Router();
const { Temperament } = require("../db");
const { breedsQ } = require("../../data/api");
const axios = require("axios");

const removeRepeated = (array) => [...new Set(array)]

router.get("/", async (req, res) => {
  const temperaments = await Temperament.findAll({ attributes: ['id', 'name'] });

  // if there is not temperaments in the database, the use the api to get the temperaments, return it to the client and save it in the database for the next use.
  if (!temperaments.length) {
    let query = breedsQ;
    const { data: breedsApi } = await axios.get(query);

    let newTemperaments = breedsApi
      .map((breed) => {
        // Remove the commas that separate each word
        const words = breed.temperament?.split(",");
        // return the array of words, removed the commas and white spaces
        return words && words.map((w) => w.trim())
      })
      // Removed the null and undefined values of the array and the nested arrays
      .filter((b) => b !== null && b !== undefined).flat()

    newTemperaments = removeRepeated(newTemperaments)
    // convert in a object to can save them in the database
    newTemperaments = newTemperaments.map((temp, i) => ({ id: i + 1, name: temp }))
    res.json(newTemperaments);
    // Save the new Temperaments from the api
    await Temperament.bulkCreate(newTemperaments)
    return
  }
  // else return the temperaments of the database
  return res.json(temperaments);
});

module.exports = router;
