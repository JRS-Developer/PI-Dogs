const getSeparatedTemps = (breeds) =>
  breeds
    .map((breed) => {
      // Remove the commas that separate each word
      const words = breed.temperament?.split(",");
      // return the array of words, removed the commas and white spaces
      return words && words.map((w) => w.trim());
    })
    // Removed the null and undefined values of the array and the nested arrays
    .filter((b) => b !== null && b !== undefined)
    .flat();

const joinTemperaments = (breeds) =>
  JSON.parse(JSON.stringify(breeds)).map((b) => {
    const temperaments = b.temperaments;
    delete b.temperaments;
    return {
      ...b,
      temperament: temperaments.map((temp) => temp.name).join(", "),
    };
  });

const removeRepeated = (array) => [...new Set(array)]

module.exports = {
  joinTemperaments,
  getSeparatedTemps,
  removeRepeated,
};
