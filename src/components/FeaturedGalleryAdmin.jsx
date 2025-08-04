import React, { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Video } from "lucide-react";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary";

export default function FeaturedGalleryAdmin() {
  const [mediaItems, setMediaItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedMedia = localStorage.getItem("mediaItems");
    if (savedMedia) setMediaItems(JSON.parse(savedMedia));
  }, []);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploaded = [];
      for (const file of files) {
        const result = await uploadToCloudinary(file);
        uploaded.push({
          type: result.type,
          url: result.url,
          public_id: result.public_id,
          alt: file.name,
        });
      }
      const updated = [...mediaItems, ...uploaded];
      setMediaItems(updated);
      localStorage.setItem("mediaItems", JSON.stringify(updated));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (publicId) => {
    try {
      await deleteFromCloudinary(publicId);
      const updated = mediaItems.filter((item) => item.public_id !== publicId);
      setMediaItems(updated);
      localStorage.setItem("mediaItems", JSON.stringify(updated));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Gallery Management</h2>

      {error && <div className="bg-red-500 p-2 mb-3 rounded">{error}</div>}

      {/* Upload */}
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/mp4"
          multiple
        />
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={isUploading}
          className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          <Upload size={20} className="mr-2" />
          {isUploading ? "Uploading..." : "Upload Media"}
        </button>
      </div>

      {/* Gallery List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediaItems.map((item, idx) => (
          <div key={idx} className="relative border rounded overflow-hidden">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-40 object-cover"
              />
            ) : (
              <video src={item.url} className="w-full h-40 object-cover" controls />
            )}
            <button
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-2 right-2 bg-red-600 p-1 rounded hover:bg-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
