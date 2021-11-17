const sortByNumber = (a, b, order) => {
  if (order === "ASC") {
    return a - b;
  } else if (order === "DESC") {
    return b - a;
  } else {
    return 0;
  }
};

const sortByString = (a, b, order) => {
  const aLow = a.toLowerCase();
  const bLow = b.toLowerCase();
  if (order === "ASC") {
    return aLow < bLow ? -1 : 1;
  } else if (order === "DESC") {
    return bLow < aLow ? -1 : 1;
  }
};

module.exports = {
  sortByNumber,
  sortByString,
};
