import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Leaf, Video } from "lucide-react";

export default function FeaturedProject() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("right");
  const [error, setError] = useState(null);

  // ✅ Load gallery images from localStorage (updated by Admin)
  useEffect(() => {
    try {
      const savedMedia = localStorage.getItem("mediaItems");
      if (savedMedia) {
        const parsedMedia = JSON.parse(savedMedia);
        const validMedia = parsedMedia.filter(
          (item) => item.url && (item.url.startsWith("http") || item.url.startsWith("blob:"))
        );
        setMediaItems(validMedia);
      }
    } catch (err) {
      console.error("Error loading gallery:", err);
      setError("Failed to load gallery");
    }
  }, []);

  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setTransitionDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  }, [mediaItems.length]);

  const nextSlide = useCallback(() => {
    if (mediaItems.length <= 1) return;
    setTransitionDirection("right");
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  }, [mediaItems.length]);

  const goToSlide = (index) => {
    setTransitionDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Auto-slide
  useEffect(() => {
    if (mediaItems.length <= 1) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, mediaItems.length]);

  return (
    <div className="text-white px-4 sm:px-12 py-12 relative">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5 w-full">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Leaf className="text-green-600" size={32} />
            <h1 className="text-3xl sm:text-4xl font-bold text-lime-300">
              Our Planet in Focus
            </h1>
          </div>
          <p className="text-gray-300 max-w-xl mx-auto">
            Documenting our conservation efforts across the globe.
          </p>
        </div>

        <div className="h-[400px] md:h-[550px] w-full relative group">
          <div className="w-full h-full rounded-2xl bg-black overflow-hidden shadow-2xl border-4 border-white relative">
            {mediaItems.length > 0 ? (
              mediaItems[currentIndex]?.type === "video" ? (
                <video
                  src={mediaItems[currentIndex].url}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className={`w-full h-full ${
                    transitionDirection === "right"
                      ? "animate-slideInRight"
                      : "animate-slideInLeft"
                  }`}
                >
                  <img
                    src={mediaItems[currentIndex]?.url}
                    alt={mediaItems[currentIndex]?.alt || "Media content"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p>No media to display.</p>
                <p className="text-sm text-gray-400">Admin will add gallery images.</p>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white hover:bg-black/50 transition z-10"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={nextSlide}
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white hover:bg-black/50 transition z-10"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 rounded-xl p-2 flex gap-2 z-20">
              {mediaItems.map((media, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden transition border-2 shadow-md ${
                    currentIndex === index
                      ? "border-green-500 scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover"
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
