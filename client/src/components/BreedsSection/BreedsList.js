import BreedItem from "./BreedItem";
import { useSelector } from 'react-redux'

const BreedsList = () => {
  const { breeds } = useSelector((state) => state.breeds)

  return (
    <ul>
      {breeds?.map((b) => (
        <BreedItem {...b} key={b.id} />
      ))}
    </ul>
  );
};

export default BreedsList;
