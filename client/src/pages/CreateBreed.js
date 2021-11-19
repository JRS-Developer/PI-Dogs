import useFetch from "use-http";
import { uploadImage } from "../helpers/uploadImage";
import { useState, useEffect } from "react";
import useGetTemperaments from "../hooks/useGetTemperaments";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import DogImg from "../images/dog_background.jpg";
import Select from "../components/Select/Select";
import { HiOutlineUpload } from "react-icons/hi";
import styles from "./CreateBreed.module.scss";

const initialInputs = {
  name: "",
  min_weight: "",
  max_weight: "",
  min_height: "",
  max_height: "",
  min_years: "",
  max_years: "",
};

const CreateBreed = () => {
  const { temperaments: allTemperaments } = useGetTemperaments();
  let { post, cache, loading } = useFetch();

  const [loadingImg, setLoadingImg] = useState(false);
  const [image, setImage] = useState(null);
  const [temps, setTemps] = useState([]);
  const [inputs, setInputs] = useState(initialInputs);
  const [selectedTemps, setSelectedTemps] = useState([]);

  const saveDog = async (dog) => {
    await post("dogs", dog);
    cache.clear();
  };

  const saveImage = async (file) => {
    setLoadingImg(true);
    const image = await uploadImage(file);
    return image;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleChangeImg = (e) => setImage(e.target.files[0]);

  const handleChangeTemps = (e) => {
    const value = e.target.value;
    const isSelected = selectedTemps.some((s) => s === value);

    if (value && !isSelected) {
      // Añado el temperamento en el estado de selectedTemps, asi puedo mostrarlos al usuario.
      setSelectedTemps((old) => [...old, value]);
    }
  };

  const removeSelected = (name) =>
    setSelectedTemps((old) => old.filter((t) => t !== name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { ...inputs, temperaments: selectedTemps };

    if (image) {
      try {
        const response = await saveImage(image);
        response?.url && (form.image = response.url);
      } catch (e) {
        console.error(e);
        return;
      }
    }

    // Reinicio el formulario
    setSelectedTemps([]);
    setInputs(initialInputs);
    setImage(null)

    saveDog(form);
    setLoadingImg(false);
  };

  useEffect(() => {
    setTemps(allTemperaments);
  }, [allTemperaments]);

  return (
    <div className={styles.container}>
      <img src={DogImg} alt="Happy Dog" className={styles.sideImg} />
      <div className={styles.sideForm}>
        <h3 className={styles.title}>Create a new Dog!</h3>
        <hr className={styles.separator} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.oneInput}>
            <label htmlFor="name">Name</label>
            <Input
              placeholder="Name"
              id="name"
              name="name"
              required
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.multiInput}>
            <label htmlFor="min_weight">Min Weight</label>
            <label htmlFor="max_weight">Max Weight</label>
            <Input
              type="number"
              placeholder="Min Weight"
              required
              name="min_weight"
              min="1"
              id="min_weight"
              value={inputs.min_weight}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Max Weight"
              required
              name="max_weight"
              id="max_weight"
              min="1"
              value={inputs.max_weight}
              onChange={handleChange}
            />
          </div>
          <div className={styles.multiInput}>
            <label htmlFor="min_height">Min Height</label>
            <label htmlFor="max_height">Max Height</label>
            <Input
              type="number"
              placeholder="Min Height"
              required
              name="min_height"
              id="min_height"
              min="1"
              value={inputs.min_height}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Max Height"
              required
              name="max_height"
              id="max_height"
              min="1"
              value={inputs.max_height}
              onChange={handleChange}
            />
          </div>
          <div className={styles.multiInput}>
            <label htmlFor="min_years">Min Years</label>
            <label htmlFor="max_years">Max Years</label>
            <Input
              type="number"
              placeholder="Min Years"
              required
              name="min_years"
              id="min_years"
              min="1"
              value={inputs.min_years}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Max Years"
              required
              name="max_years"
              id="max_years"
              min="1"
              value={inputs.max_years}
              onChange={handleChange}
            />
          </div>
          <div className={styles.multiInput}>
            <div>
              <label htmlFor="temperaments">Temperaments</label>
              <Select
                className={styles.fullW}
                defaultValue=""
                id="temperaments"
                onChange={handleChangeTemps}
              >
                <option value="" disabled>
                  Select One
                </option>
                {temps.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className={styles.tempsContainer}>
              {selectedTemps.map((t, i) => (
                <Button
                  type="button"
                  className={styles.temp}
                  key={i}
                  onClick={() => removeSelected(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.upload}>
            <Button className={styles.uploadButton} type="button">
              <label htmlFor="image" className={styles.uploadLabel}>
                <HiOutlineUpload />
              </label>
            </Button>
            <p>{image?.name ? image.name : "Upload an image"}</p>
          </div>
          <Input
            hidden
            type="file"
            placeholder="Image url"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChangeImg}
          />
          <Button
            type="submit"
            className={styles.submit}
            disabled={loading || loadingImg ? true : false}
          >
            {loading || loadingImg ? "Loading" : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBreed;
