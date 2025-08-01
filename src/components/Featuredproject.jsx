import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Upload,
  Video,
  Trash2,
  X,
} from "lucide-react";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary";

export default function FeaturedProject() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("right");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const carouselRef = useRef(null);

  // Load media from localStorage on component mount
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const savedMedia = localStorage.getItem("mediaItems");
        if (savedMedia) {
          const parsedMedia = JSON.parse(savedMedia);
          // Filter out any invalid items
          const validMedia = parsedMedia.filter(item => 
            item.url && (item.url.startsWith('http') || item.url.startsWith('blob:'))
          );
          setMediaItems(validMedia);
        } else {
          // Load initial slides if no saved media
          const initialSlides = [
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop",
              alt: "Forest floor",
              isExternal: true
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
              alt: "Wooden walkway",
              isExternal: true
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2400&auto=format&fit=crop",
              alt: "Rolling hills",
              isExternal: true
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop",
              alt: "Mountain range",
              isExternal: true
            },
            {
              type: "image",
              url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
              alt: "Serene lake",
              isExternal: true
            },
          ];
          setMediaItems(initialSlides);
        }
      } catch (error) {
        console.error("Error loading media:", error);
        setError("Failed to load saved media");
      }
    };

    loadMedia();
  }, []);

  // Save media to localStorage when it changes
  useEffect(() => {
    try {
      if (mediaItems.length > 0) {
        localStorage.setItem("mediaItems", JSON.stringify(mediaItems));
      }
    } catch (error) {
      console.error("Error saving media:", error);
    }
  }, [mediaItems]);

  // Carousel navigation functions
  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setTransitionDirection("left");
    const newIndex =
      currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, mediaItems.length]);

  const nextSlide = useCallback(() => {
    if (mediaItems.length <= 1) return;
    setTransitionDirection("right");
    const newIndex =
      currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, mediaItems.length]);

  const goToSlide = (slideIndex) => {
    setTransitionDirection(slideIndex > currentIndex ? "right" : "left");
    setCurrentIndex(slideIndex);
  };

  // Handle file uploads to Cloudinary
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);
    const newItems = [...mediaItems];
    let uploadSuccess = false;

    try {
      // Verify Cloudinary configuration
      if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 
          !import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary configuration is missing");
      }

      for (const file of files) {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          try {
            const result = await uploadToCloudinary(file);
            newItems.push({
              type: result.type,
              url: result.url,
              public_id: result.public_id,
              alt: file.name,
            });
            uploadSuccess = true;
          } catch (uploadError) {
            console.error(`Failed to upload ${file.name}:`, uploadError);
            continue;
          }
        }
      }

      if (uploadSuccess) {
        setMediaItems(newItems);
        setCurrentIndex(newItems.length - 1);
      } else {
        throw new Error("No files were successfully uploaded");
      }
    } catch (error) {
      setError(error.message);
      console.error("Upload process failed:", error);
    } finally {
      setIsUploading(false);
      // Reset file input to allow selecting same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Delete media item from both state and Cloudinary
  const deleteItem = async (indexToDelete) => {
    if (mediaItems.length === 0) return;

    const item = mediaItems[indexToDelete];
    
    try {
      setError(null);
      
      // Only delete from Cloudinary if it's not an external URL
      if (!item.isExternal && item.public_id) {
        await deleteFromCloudinary(item.public_id);
      }

      const newItems = [...mediaItems];
      newItems.splice(indexToDelete, 1);
      setMediaItems(newItems);

      // Adjust current index if needed
      setCurrentIndex(prev => {
        if (prev >= newItems.length) {
          return Math.max(0, newItems.length - 1);
        }
        return prev >= indexToDelete ? Math.max(0, prev - 1) : prev;
      });
    } catch (error) {
      setError(`Failed to delete: ${error.message}`);
      console.error("Error deleting item:", error);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    if (mediaItems.length <= 1) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, mediaItems.length]);

  return (
    <div className="text-white px-4 sm:px-12 py-12 relative">
      {/* Error Notification */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-md flex items-start">
          <div className="flex-1">
            <div className="font-bold">Error</div>
            <div>{error}</div>
            {error.includes("Cloudinary") && (
              <div className="text-sm mt-1">
                Please check your Cloudinary configuration
              </div>
            )}
          </div>
          <button 
            onClick={() => setError(null)}
            className="ml-4 p-1 hover:bg-red-600 rounded"
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5 w-full">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Leaf className="text-green-600" size={32} />
            <h1 className="text-3xl sm:text-4xl font-bold text-lime-300 text-center">
              Our Planet in Focus
            </h1>
          </div>
          <p className="text-gray-300 max-w-xl mx-auto text-center">
            Documenting our conservation efforts across the globe.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="h-[400px] md:h-[550px] w-full relative group"
          ref={carouselRef}
        >
          {/* Main Display Area */}
          <div className="w-full h-full rounded-2xl bg-black overflow-hidden shadow-2xl shadow-green-900/20 border-4 border-white relative">
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-3"></div>
                  <p>Uploading media...</p>
                  <p className="text-sm text-gray-300 mt-1">
                    Please wait
                  </p>
                </div>
              </div>
            )}

            {mediaItems.length > 0 ? (
              mediaItems[currentIndex]?.type === "video" ? (
                <video
                  src={mediaItems[currentIndex].url}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  key={mediaItems[currentIndex].url}
                  onError={() => {
                    setError("Failed to load video");
                    nextSlide();
                  }}
                />
              ) : (
                <div
                  className={`w-full h-full ${
                    transitionDirection === "right"
                      ? "animate-slideInRight"
                      : "animate-slideInLeft"
                  }`}
                  key={mediaItems[currentIndex].url}
                >
                  <img
                    src={mediaItems[currentIndex]?.url}
                    alt={mediaItems[currentIndex]?.alt || "Media content"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => {
                      setError("Failed to load image");
                      nextSlide();
                    }}
                  />
                </div>
              )
            ) : (
              <div className="text-white text-center absolute inset-0 flex flex-col items-center justify-center">
                <p>No media to display.</p>
                <p className="text-sm text-gray-400">
                  Click the upload icon to get started.
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/mp4,video/webm,video/quicktime"
            multiple
            disabled={isUploading}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            aria-label="Add media"
            disabled={isUploading}
            className="absolute top-4 right-16 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white cursor-pointer hover:bg-green-600/80 transition-all duration-300 z-30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={20} />
          </button>

          {/* Delete Button */}
          {mediaItems.length > 0 && (
            <button
              onClick={() => deleteItem(currentIndex)}
              aria-label="Delete media"
              disabled={isUploading}
              className="hidden group-hover:flex absolute top-4 right-4 items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white cursor-pointer hover:bg-red-500/80 transition-all duration-300 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={20} />
            </button>
          )}

          {/* Navigation Arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous"
                disabled={isUploading || mediaItems.length <= 1}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next"
                disabled={isUploading || mediaItems.length <= 1}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto bg-black/20 rounded-xl p-2 flex items-center justify-center gap-2 md:gap-4 z-20">
              {mediaItems.map((media, index) => (
                <div
                  key={index}
                  onClick={() => !isUploading && goToSlide(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ease-in-out border-2 shadow-md ${
                    currentIndex === index
                      ? "border-green-500 scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  } ${isUploading ? "pointer-events-none" : ""}`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80?text=Image+Error";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-gray-800">
                      <Video size={28} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}