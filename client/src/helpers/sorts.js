const sortByNumber = (a, b, order) => {
  // convert the numbers in a integer, in case it is a float number
  a = Math.trunc(a)
  b = Math.trunc(b)
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
