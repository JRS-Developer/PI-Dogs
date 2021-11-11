import useFetch from "use-http";

const CreateBreed = () => {
  const { post, loading, cache } = useFetch();

  const saveDog = async (dog) => {
    await post("dogs", dog);
    cache.clear()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {};

    for (let input of e.target) {
      form[input.name] = input.value;
    }
    saveDog(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" name="name" />
      <input type="number" placeholder="Min Weight" name="min_weight" />
      <input type="number" placeholder="Max Weight" name="max_weight" />
      <input type="number" placeholder="Min Height" name="min_height" />
      <input type="number" placeholder="Max Height" name="max_height" />
      <input type="number" placeholder="Min Years" name="min_years" />
      <input type="number" placeholder="Max Years" name="max_years" />
      <button type="submit">{loading ? "Loading" : "Send"}</button>
    </form>
  );
};

export default CreateBreed;
