const SET_TEMPERAMENTS = "temp/set_temperaments";

const setTemperaments = (temps) => {
  return {
    type: SET_TEMPERAMENTS,
    payload: temps,
  };
};

export { setTemperaments };
export { SET_TEMPERAMENTS };
