import useFetch from "use-http";
import { uploadImage } from "../helpers/uploadImage";
import { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import DogImg from "../images/dog_background.jpg";
import styles from "./CreateBreed.module.scss";
import { HiOutlineUpload } from "react-icons/hi";

const CreateBreed = () => {
  const [loadingImg, setLoadingImg] = useState(false);
  let { post, cache, loading } = useFetch();

  const saveDog = async (dog) => {
    await post("dogs", dog);
    cache.clear();
  };

  const saveImage = async (file) => {
    setLoadingImg(true);
    const image = await uploadImage(file);
    return image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {};

    for (let input of e.target) {
      if (input.type !== "file") {
        form[input.name] = input.value;
      } else if (input.type === "file" && input.files.length) {
        const { url } = await saveImage(input.files[0]);
        form[input.name] = url;
      }
    }
    saveDog(form);
    setLoadingImg(false);
  };

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
          <Input
            hidden
            type="file"
            placeholder="Image url"
            name="image"
            id="image"
            accept="image/*"
          />
          <Button type="button">
            <label htmlFor="image">
              <HiOutlineUpload />
            </label>
          </Button>
          <Button type="submit" className={styles.submit}>
            {loading || loadingImg ? "Loading" : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBreed;
