const { Op } = require("sequelize");
const { joinTemperaments, isUUID } = require("../helpers/");
const { breedsQ } = require("../../data/api");
const { Dog, Temperament } = require("../db");
const axios = require("axios");

const NO_RESULTS_MESSAGE = "No Results";

const getDogs = async (req, res, next) => {
  try {
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

    condition.attributes = ["id", "name", "image", "weight", "height"];
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

    // INFO: This is to get the data by name, the API of dogs searching by name doesn't return the images, so I prefered this option
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
  } catch (e) {
    next(e);
  }
};

const getDogById = async (req, res, next) => {
  try {
    const { idRaza } = req.params;
    let query = breedsQ;

    let breedDB =
      isUUID(idRaza) &&
      (await Dog.findByPk(idRaza, {
        attributes: ["id", "name", "image", "weight", "height", "life_span"],
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      }));

    //INFO: if the data is in the database, then return it. If not then use the API
    if (breedDB) {
      breedDB = joinTemperaments([breedDB])[0];
      return res.json(breedDB);
    }

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
  } catch (e) {
    next(e);
  }
};

const createDog = async (req, res, next) => {
  try {
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      image,
      min_years,
      max_years,
      temperaments,
    } = req.body;

    // Check that the values are provided
    if (!name)
      return res
        .status(403)
        .json({ message: "Please provide the name of the breed" });
    if (!min_height || !max_height || !min_weight || !max_weight)
      return res
        .status(403)
        .json({ message: "Please provide the min and max height and weight" });
    // CHeck that the min values are not higher that the max values
    if (min_height > max_height) {
      return res.status(403).json({
        message: "The min height cant be higher that max height",
      });
    }
    if (min_weight > max_weight) {
      return res.status(403).json({
        message: "The min weight cant be higher that max weight",
      });
    }
    if (min_years && max_years && min_years > max_years) {
      return res.status(403).json({
        message: "The min years cant be higher that max years",
      });
    }

    const lifeSpanY =
      min_years && max_years ? `${min_years} - ${max_years} years` : undefined;

    const condition = {
      where: {
        name,
      },
      defaults: {
        name,
        height: `${min_height} - ${max_height}`,
        weight: `${min_weight} - ${max_weight}`,
        image,
        life_span: lifeSpanY,
      },
    };

    //INFO: check if the name is already taked, if true, then return a message that already is created if not, the add the temperaments and show a succesfull message
    const [breedDB, created] = await Dog.findOrCreate(condition);
    if (created) {
      temperaments?.length && (await breedDB.setTemperaments(temperaments));

      return res.status(201).json({ message: "Data saved sucessfully" });
    }
    return res
      .status(303)
      .json({ message: "There is already a breed with that name" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getDogs,
  getDogById,
  createDog,
};
