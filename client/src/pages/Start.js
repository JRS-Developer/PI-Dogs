import styles from "./Start.module.scss";
import useGetBreeds from "../hooks/useGetBreeds";
import { useState, useEffect, useCallback } from "react";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/dog.png";

const Start = () => {
  const { breeds } = useGetBreeds();
  const [breed, setBreed] = useState({});
  const navigate = useNavigate();

  const goToHome = () => navigate("/home");

  const setRandomBreed = useCallback(() => {
    const n = Math.floor(Math.random() * breeds.length);
    setBreed(breeds[n]);
  }, [breeds]);

  useEffect(() => {
    // get a random breed each time
    setRandomBreed();
  }, [setRandomBreed]);

  return (
    <main className={styles.main}>
      <img
        className={styles.img}
        src={breed?.image ? breed.image : defaultImg}
        alt={breed?.name ? breed.name : "Dog"}
        title={`This is a ${breed?.name ? breed.name : ""}`}
        onClick={setRandomBreed}
      />
      <div>
        <h1>
          Welcome to <b className={styles.highlight}>Dogs J!</b>
        </h1>
        <p>
          The site that allow you to find and create{" "}
          <b className={styles.highlight}>dog breeds!</b>
        </p>
        <Button className={styles.button} onClick={goToHome}>
          Start!
        </Button>
      </div>
    </main>
  );
};

export default Start;
