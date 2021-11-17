const { REACT_APP_CLOUD_NAME, REACT_APP_UPLOAD_PRESET } = process.env;

const uploadImage = async (file) => {
  try {
    const uri = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`;

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", REACT_APP_UPLOAD_PRESET);
    const data = await fetch(uri, {
      method: "POST",
      body: form,
    });
    return await data.json();
  } catch (e) {
    console.error(e);
  }
};

export { uploadImage };
