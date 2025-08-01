export const uploadToCloudinary = async (file) => {
  // Validate environment variables first
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${
        file.type.startsWith('video/') ? 'video' : 'image'
      }/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      public_id: data.public_id,
      type: file.type.startsWith('video/') ? 'video' : 'image',
    };
  } catch (error) {
    console.error('Detailed upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    // Validate input
    if (!publicId || typeof publicId !== 'string') {
      throw new Error('Invalid public_id');
    }

    // Cloudinary configuration
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    
    if (!cloudName || !apiKey) {
      throw new Error('Cloudinary configuration missing');
    }

    // Create form data with required parameters
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', apiKey);

    // Add timestamp and signature for authentication
    const timestamp = Math.floor(Date.now() / 1000);
    formData.append('timestamp', timestamp.toString());

    // Note: For client-side deletion, you'll need to either:
    // 1. Use an unsigned preset that allows deletion
    // 2. Create a backend API endpoint for secure deletion (recommended)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Deletion failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Detailed deletion error:', error);
    throw new Error(`Deletion failed: ${error.message}`);
  }
};