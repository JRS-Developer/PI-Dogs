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

const CreateBreed = () => {
  const { temperaments: allTemperaments } = useGetTemperaments();
  let { post, cache, loading } = useFetch();

  const [loadingImg, setLoadingImg] = useState(false);
  const [image, setImage] = useState(null);
  const [temps, setTemps] = useState([]);
  const [selectedTemps, setSelelectTemps] = useState([]);

  const saveDog = async (dog) => {
    await post("dogs", dog);
    cache.clear();
  };

  const saveImage = async (file) => {
    setLoadingImg(true);
    const image = await uploadImage(file);
    return image;
  };

  const handleChangeImg = (e) => setImage(e.target.files[0]);

  const handleChangeTemps = (e) => {
    const value = e.target.value;
    const isSelected = selectedTemps.some((s) => s === value);

    if (value && !isSelected) {
      // Añado el temperamento en el estado de selectedTemps, asi puedo mostrarlos al usuario.
      setSelelectTemps((old) => [...old, value]);
    }
  };

  const removeSelected = (name) =>
    setSelelectTemps((old) => old.filter((t) => t !== name));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {};

    for (let input of e.target) {
      // recorro cada input, si no es tipo file, solo le pongo el value
      if (input.type !== "file") {
        form[input.name] = input.value;
        input.value = ""
      } else if (input.type === "file" && input.files.length) {
        // Si es tipo file y tiene algun archivo seleccionado, entonces, guarda la imagen en Cloudinary, y devuelve el url. Para guardarlo en el backend
        try {
          const image = await saveImage(input.files[0]);
          image?.url && (form[input.name] = image.url);
        } catch (e) {
          console.error(e);
          return;
        }
      }
    }
    // Guardo los temperamentos seleccionados
    form["temperaments"] = selectedTemps;
    setSelelectTemps([])

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
            <Input placeholder="Name" id="name" name="name" required />
          </div>
          <div className={styles.multiInput}>
            <label htmlFor="min_weight">Min Weight</label>
            <label htmlFor="max_weight">Max Weight</label>
            <Input
              type="number"
              placeholder="Min Weight"
              required
              name="min_weight"
              id="min_weight"
            />
            <Input
              type="number"
              placeholder="Max Weight"
              required
              name="max_weight"
              id="max_weight"
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
            />
            <Input
              type="number"
              placeholder="Max Height"
              required
              name="max_height"
              id="max_height"
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
            />
            <Input
              type="number"
              placeholder="Max Years"
              required
              name="max_years"
              id="max_years"
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
