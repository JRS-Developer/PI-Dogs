import useFetch from "use-http";
import { uploadImage } from "../helpers/uploadImage";
import { useState, useEffect, useCallback } from "react";
import useGetTemperaments from "../hooks/useGetTemperaments";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import DogImg from "../images/dog_background.jpg";
import Select from "../components/Select/Select";
import { HiOutlineUpload } from "react-icons/hi";
import styles from "./CreateBreed.module.scss";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const initialInputs = {
  name: "",
  min_weight: "",
  max_weight: "",
  min_height: "",
  max_height: "",
  min_years: "",
  max_years: "",
};

const initialErrors = {
  hasErrors: false,
  ...initialInputs,
};

const CreateBreed = () => {
  const { temperaments: allTemperaments } = useGetTemperaments();
  let { post, cache, loading } = useFetch();

  const [loadingImg, setLoadingImg] = useState(false);
  const [image, setImage] = useState(null);
  const [temps, setTemps] = useState([]);
  const [inputs, setInputs] = useState(initialInputs);
  const [lastInput, setLastInput] = useState(null);
  const [errors, setErrors] = useState(initialErrors);
  const [selectedTemps, setSelectedTemps] = useState([]);

  const saveDog = async (dog) => {
    await post("dogs", dog);
    cache.clear();
  };

  const validate = useCallback((input, allInputs, errors) => {
    const newErrors = { ...errors, hasErrors: false };
    const { name, value } = input;

    // Check empty values
    if (value === "" && !name.includes("years")) {
      newErrors[name] = "This value is required";
      newErrors.hasErrors = true;
    } else if (value !== "" && !name.includes("years")) {
      newErrors[name] = "";
      newErrors.hasErrors = false;
    }

    // Check min and max values
    const property = name.substring(name.lastIndexOf("_") + 1); // Get what is after the underscore
    const min = `min_${property}`;
    const max = `max_${property}`;
    // Compare
    if (value !== "" && Number(allInputs[min]) > Number(allInputs[max])) {
      newErrors[
        min
      ] = `The min ${property} cant be higher that the max ${property}`;
      newErrors.hasErrors = true;
    } else if (value !== "") {
      newErrors[min] = ``;
      newErrors.hasErrors = false;
    }

    return newErrors;
  }, []);

  const saveImage = async (file) => {
    setLoadingImg(true);
    const image = await uploadImage(file);
    return image;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLastInput(e.target);
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

    // Si hay errores, entonces no realizara el envio de la data al server
    if (errors.hasErrors) return

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
    setImage(null);

    saveDog(form);
    setLoadingImg(false);
  };

  useEffect(() => {
    setTemps(allTemperaments);
  }, [allTemperaments]);

  useEffect(() => {
    // When the lastInput used is updated then check the inputs and show the errors.
    lastInput &&
      setErrors((old) => ({ ...old, ...validate(lastInput, inputs, old) }));
  }, [lastInput, validate, inputs]);

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
              className={errors.name ? styles.error : ""}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </div>
          <div className={styles.multiInput}>
            <div>
              <label htmlFor="min_weight">Min Weight</label>
              <Input
                type="number"
                placeholder="Min Weight"
                required
                name="min_weight"
                min="1"
                id="min_weight"
                value={inputs.min_weight}
                onChange={handleChange}
                className={errors.min_weight ? styles.error : ""}
              />
              {errors.min_weight && (
                <ErrorMessage>{errors.min_weight}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="max_weight">Max Weight</label>
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
          </div>
          <div className={styles.multiInput}>
            <div>
              <label htmlFor="min_height">Min Height</label>
              <Input
                type="number"
                placeholder="Min Height"
                required
                name="min_height"
                id="min_height"
                min="1"
                value={inputs.min_height}
                onChange={handleChange}
                className={errors.min_height ? styles.error : ""}
              />
              {errors.min_height && (
                <ErrorMessage>{errors.min_height}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="max_height">Max Height</label>
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
          </div>
          <div className={styles.multiInput}>
            <div>
              <label htmlFor="min_years">Min Years</label>
              <Input
                type="number"
                placeholder="Min Years"
                required
                name="min_years"
                id="min_years"
                min="1"
                value={inputs.min_years}
                onChange={handleChange}
                className={errors.min_years ? styles.error : ""}
              />
              {errors.min_years && (
                <ErrorMessage>{errors.min_years}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="max_years">Max Years</label>
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
            disabled={loading || loadingImg || errors.hasErrors ? true : false}
          >
            {loading || loadingImg ? "Loading" : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBreed;
