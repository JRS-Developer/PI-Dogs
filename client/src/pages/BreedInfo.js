import { useParams } from "react-router-dom";
import useFetch from "use-http";
import { useState, useEffect, useCallback } from "react";

const BreedInfo = () => {
  const { get, response, loading } = useFetch();
  const { idBreed } = useParams();
  const [breed, setBreed] = useState({});

  const getBreedInfo = useCallback(async () => {
    const data = await get(`dogs/${idBreed}`);
    console.log(data);
    response.ok && setBreed(data);
  }, [get, idBreed, response]);

  useEffect(() => {
    getBreedInfo();
  }, [getBreedInfo]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
          <div>
            <img src={breed.image} alt={breed.name} />
            <h1>{breed.name}</h1>
            <p>{breed.temperament}</p>
            <p>{breed.height}</p>
            <p>{breed.weight}</p>
            <p>{breed.life_span}</p>
          </div>
        )}
    </div>
  );
};

export default BreedInfo;
