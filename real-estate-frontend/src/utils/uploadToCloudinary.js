export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "upendradevendra"); // replace with your preset

  const res = await fetch("https://api.cloudinary.com/v1_1/duk0kt1f0/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};
