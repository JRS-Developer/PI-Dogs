import { Link } from "react-router-dom";
import DefaultImg from "../../images/dog.png";
import styles from "./BreedCard.module.scss";

const BreedCard = ({ id, name, image, temperament, weight }) => (
  <li className={styles.card}>
    <Link to={`../breed/${id}`}>
      <img
        className={styles.img}
        src={image ? image : DefaultImg}
        alt={name}
        title={name}
      />
    </Link>
    <div className={styles.textContainer}>
      <Link to={`../breed/${id}`} className={styles.name}>
        <h4>{name}</h4>
      </Link>
      {temperament && (
        <p className={styles.temperament}>
          <b>Temperaments:</b>
          <br />
          {temperament}
        </p>
      )}
      <p>
        <b>Weight:</b> {weight}kg
      </p>
    </div>
  </li>
);
export default BreedCard;
