const router = require("express").Router();
const { Dog, Temperament } = require("../db");
const { breedsQ } = require("../../data/api");
const axios = require("axios");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const { name } = req.query;
  const queryAll = breeqsQ
  let queryByName = breedsQ;
  // If there is a name query, then search the breeds by name
  name && (queryByName += "search?q=" + name);
  const condition = name
    ? {
      where: {
        name: {
          [Op.substring]: name,
        }
      },
    }
    : {};
  // FIX: Hay un problema al usar el endpoint de busqueda de raza de la api con las imagenes, no me retorna la url, asi que debo hacer una busqueda de todas las razas y en base de los resultados, tomar las urls de las imagenes. Tal vez con un filter pueda resolverlo.
  const breedsDB = await Dog.findAll(condition)
  const { data: allBreedsApi } = await axios.get(breedsQ);
  const { data: breedsByName } = await axios.get(queryByName)

  const breeds = breedsApi.map((breed) => {
    const {
      id,
      name,
      image: { url: image },
      temperament,
      weight: { imperial: weight },
    } = breed;

    return { id, name, image, temperament, weight };
  });
  return res.json(breeds);
});

router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  let query = breedsQ;

  const breedDB = await Dog.findByPk(idRaza, { include: Temperament });
  const { data: breedsApi } = await axios.get(query);

  const {
    weight: { imperial: weight },
    height: { imperial: height },
    id,
    name,
    image: { url: image },
    temperament,
    life_span,
  } = breedsApi.find((breed) => breed.id === Number(idRaza));

  const breed = { id, name, image, temperament, weight, height, life_span };
  return res.json(breed);
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      life_span,
      temperaments,
    } = req.body;
    console.log(req.body)
    console.log(min_height, max_height, min_weight, max_weight)
    if (!name)
      return res
        .status(403)
        .json({ message: "Please provide the name of the breed" });
    if (!min_height || !max_height || !min_weight || !max_weight)
      return res
        .status(403)
        .json({ message: "Please provide the min and max height and weight" });

    const height = `${min_height} - ${max_height}`;
    const weight = `${min_weight} - ${max_weight}`;
    const lifeSpanY = `${life_span} years`;

    const breedDB = await Dog.create({
      name,
      weight,
      height,
      life_span: lifeSpanY,
    });
    await breedDB.setTemperaments(temperaments);
    console.log(await breedDB.getTemperaments());

    return res.json({ message: "Nice", data: breedDB });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
