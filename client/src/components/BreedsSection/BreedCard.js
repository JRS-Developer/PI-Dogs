import { Link } from "react-router-dom";
import DefaultImg from "../../images/dog.png";

const BreedCard = ({ id, name, image, temperament, weight }) => {
  return (
    <li>
      <Link to={`../breed/${id}`}>
        <h1>{name}</h1>
      </Link>
      <img src={image ? image : DefaultImg} alt={name} />
      <p>{temperament}</p>
      <p>{weight}</p>
    </li>
  );
};

export default BreedCard;
