import BreedCard from "./BreedCard";

const BreedsList = ({ breeds }) => (
  <ul>
    {breeds.length ? (
      breeds.map((b) => <BreedCard {...b} key={b.id} />)
    ) : (
        <div>No Results</div>
      )}
  </ul>
);

export default BreedsList;
