const { Op } = require("sequelize");
const { joinTemperaments, isUUID } = require("../helpers/");
const { breedsQ } = require("../../data/api");
const { Dog, Temperament } = require("../db");
const axios = require("axios");

const NO_RESULTS_MESSAGE = "No Results";

const getDogs = async (req, res) => {
  const { name } = req.query;
  const queryAll = breedsQ;
  const condition = name
    ? {
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    }
    : {};

  condition.attributes = ["id", "name", "weight", "height"];
  condition.include = {
    model: Temperament,
    attributes: ["name"],
    through: { attributes: [] },
  };

  let breedsDB = await Dog.findAll(condition);
  const { data: allBreedsApi } = await axios.get(queryAll);

  //INFO: This part is to join the temperaments of the database to only a string temperament. This is only to match the data like the API.
  // The JSON.parse(JSON.stringify) is to can use the map,it doesn't work without it
  breedsDB = joinTemperaments(breedsDB);

  // INFO: This is to get the data by name, the API of dogs searing by namedoesn't return the images, so I prefered this option
  const breeds = name
    ? allBreedsApi.filter((breed) => {
      const regex = new RegExp(name, "i");
      return regex.test(breed.name);
    })
    : allBreedsApi;

  let responseBreeds = breeds.map((breed) => {
    const {
      id,
      name,
      image: { url: image },
      temperament,
      weight: { imperial: weight },
      height: { imperial: height },
    } = breed;

    return { id, name, image, temperament, weight, height };
  });

  breedsDB?.length && (responseBreeds = [...breedsDB, ...responseBreeds]);
  return responseBreeds?.length
    ? res.json(responseBreeds)
    : res.status(302).json({ message: NO_RESULTS_MESSAGE });
};

const getDogById = async (req, res) => {
  const { idRaza } = req.params;
  let query = breedsQ;

  const breedDB =
    isUUID(idRaza) &&
    (await Dog.findByPk(idRaza, {
      attributes: ["id", "name", "weight", "height", "life_span"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    }));

  //INFO: if the data is in the database, then return it. If not then use the API
  if (breedDB) return res.json(breedDB);

  const { data: breedsApi } = await axios.get(query);
  const breed = breedsApi.find((b) => b.id === Number(idRaza));

  if (breed) {
    const responseObj = {
      id: breed.id,
      name: breed.name,
      image: breed.image.url,
      temperament: breed.temperament,
      weight: breed.weight.metric,
      height: breed.height.metric,
      life_span: breed.life_span,
    };
    return res.json(responseObj);
  }

  return res.status(302).json({ message: NO_RESULTS_MESSAGE });
};

const createDog = async (req, res) => {
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

    if (!name)
      return res
        .status(403)
        .json({ message: "Please provide the name of the breed" });
    if (!min_height || !max_height || !min_weight || !max_weight)
      return res
        .status(403)
        .json({ message: "Please provide the min and max height and weight" });

    const lifeSpanY = life_span ? `${life_span} years` : undefined;

    const condition = {
      where: {
        name,
      },
      defaults: {
        name,
        height: `${min_height} - ${max_height}`,
        weight: `${min_weight} - ${max_weight}`,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span: lifeSpanY,
      },
    };

    //INFO: check if the name is already taked, if true, then return a message that already is created if not, the add the temperaments and show a succesfull message
    const [breedDB, created] = await Dog.findOrCreate(condition);

    if (created) {
      temperaments?.length && (await breedDB.setTemperaments(temperaments));

      return res.json({ message: "Data saved sucessfully" });
    }
    return res.json({ message: "There is already a breed with that name" });
  } catch (e) {
    res.status(500).json({ message: "An error with the server has ocurred" });
    console.error(e);
  }
};

module.exports = {
  getDogs,
  getDogById,
  createDog
};
