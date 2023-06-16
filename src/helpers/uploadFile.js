import { getEnvironmentVariables } from './getEnvironmentVariables';

export const uploadFile = async (file) => {
  if (!file) throw new Error('File is required');
  const { VITE_CLOUDINARY_URL, VITE_CLOUDINARY_UPLOAD_PRESET } =
    getEnvironmentVariables();
  const cloudUrl = VITE_CLOUDINARY_URL;
  const formData = new FormData();

  formData.append('upload_preset', VITE_CLOUDINARY_UPLOAD_PRESET);

  formData.append('file', file);

  try {
    const response = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const cloudResponse = await response.json();

    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
