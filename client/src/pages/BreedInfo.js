import { useParams } from "react-router-dom";
import useFetch from "use-http";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./BreedInfo.module.scss";

const BreedInfo = () => {
  const { get, response, loading } = useFetch();
  const { idBreed } = useParams();
  const [breed, setBreed] = useState({});
  const navigate = useNavigate();

  const goBack = () => navigate("../home");

  const getBreedInfo = useCallback(async () => {
    const data = await get(`dogs/${idBreed}`);
    response.ok && setBreed(data);
  }, [get, idBreed, response]);

  const temperaments = breed?.temperaments.map((t) => t.name).join(",");

  useEffect(() => {
    getBreedInfo();
  }, [getBreedInfo]);

  return (
    <div className={styles.container}>
      <div>
        <Button onClick={goBack}>
          <FaArrowLeft />
          Go Back
        </Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
          <div>
            <img
              className={styles.img}
              src={breed.image}
              alt={breed.name}
              title={breed.name}
            />
            <div className={styles.textContainer}>
              <h3 className={styles.name}>{breed.name}</h3>
              {temperaments && (
                <p>
                  <b>Temperaments: </b>
                  {temperaments}
                </p>
              )}
              <p>
                <b>Height: </b>
                {breed.height} cm
            </p>
              <p>
                <b>Weight: </b>
                {breed.weight} kg
            </p>
              <p>
                <b>Life Span: </b>
                {breed.life_span}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default BreedInfo;
