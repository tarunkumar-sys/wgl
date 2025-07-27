export const saveImageToStorage = async (imageData) => {
  if (!imageData.startsWith('data:image')) {
    return imageData; // Already a URL, no need to store
  }

  try {
    // Use IndexedDB to store large images
    const db = await openDB('ProjectImagesDB', 1, {
      upgrade(db) {
        db.createObjectStore('images');
      },
    });
    
    const id = Date.now().toString();
    await db.put('images', imageData, id);
    return `indexeddb:${id}`;
  } catch (error) {
    console.error("Error saving image:", error);
    return imageData; // Fallback to base64 if IndexedDB fails
  }
};

export const getImageFromStorage = async (imageRef) => {
  if (!imageRef.startsWith('indexeddb:')) {
    return imageRef;
  }

  try {
    const id = imageRef.replace('indexeddb:', '');
    const db = await openDB('ProjectImagesDB');
    return await db.get('images', id);
  } catch (error) {
    console.error("Error loading image:", error);
    return '';
  }
};