import BreedCard from "./BreedCard";
import styles from './BreedsList.module.scss'

const BreedsList = ({ breeds }) => (
  <ul className={styles.list}>
    {breeds.length ? (
      breeds.map((b) => <BreedCard {...b} key={b.id} />)
    ) : (
        <div>No Results</div>
      )}
  </ul>
);

export default BreedsList;
