import { useParams } from "react-router-dom";
import useFetch from "use-http";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./BreedInfo.module.scss";
import defaultImg from '../images/dog.png'

const BreedInfo = () => {
  const { get, response, loading } = useFetch();
  const { idBreed } = useParams();
  const [breed, setBreed] = useState({});
  const navigate = useNavigate();

  const goBack = () => navigate("../home");

  const redirect = useCallback(
    () => navigate("../home", { replace: true }),
    [navigate]
  );

  const getBreedInfo = useCallback(async () => {
    const data = await get(`dogs/${idBreed}`);

    /// SI el servidor retorna un message, en vez de un array, entonces significa que no hay una raza que coincida con el id, entonces redirigue a la pagina principal
    if (data.message) return redirect();

    response.ok && setBreed(data);
  }, [get, idBreed, response, redirect]);

  const temperaments = breed?.temperaments?.map((t) => t.name).join(",");

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
        <div className={styles.loading}>Loading...</div>
      ) : (
          <div className={styles.info}>
            <img
              className={styles.img}
              src={breed.image ? breed.image : defaultImg}
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
