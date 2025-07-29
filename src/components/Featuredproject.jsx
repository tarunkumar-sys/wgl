import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Upload, Video, Trash2 } from 'lucide-react';
import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
  return openDB('MediaStorageDB', 1, {
    upgrade(db) {
      db.createObjectStore('media');
    },
  });
};

// Save media to IndexedDB
export const saveMediaToStorage = async (mediaData) => {
  if (typeof mediaData !== 'string' || mediaData.startsWith('http')) {
    return mediaData; // Already a URL, no need to store
  }

  try {
    const db = await initDB();
    const id = Date.now().toString();
    await db.put('media', mediaData, id);
    return `indexeddb:${id}`;
  } catch (error) {
    console.error("Error saving media:", error);
    return mediaData; // Fallback to original data if IndexedDB fails
  }
};

// Get media from IndexedDB
export const getMediaFromStorage = async (mediaRef) => {
  if (!mediaRef.startsWith('indexeddb:')) {
    return mediaRef;
  }

  try {
    const id = mediaRef.replace('indexeddb:', '');
    const db = await initDB();
    return await db.get('media', id);
  } catch (error) {
    console.error("Error loading media:", error);
    return '';
  }
};

export default function FeaturedProject() {
  const [mediaItems, setMediaItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('right');
  const fileInputRef = useRef(null);
  const carouselRef = useRef(null);

  // Load media from storage on component mount
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const savedMedia = localStorage.getItem('mediaItems');
        if (savedMedia) {
          const parsedMedia = JSON.parse(savedMedia);
          
          // Restore media items with their actual data
          const restoredMedia = await Promise.all(
            parsedMedia.map(async (item) => {
              const url = await getMediaFromStorage(item.url);
              return { ...item, url };
            })
          );
          
          setMediaItems(restoredMedia);
        } else {
          // Load initial slides if no saved media
          const initialSlides = [
            { type: 'image', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop', alt: 'Forest floor' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop', alt: 'Wooden walkway' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2400&auto=format&fit=crop', alt: 'Rolling hills' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop', alt: 'Mountain range' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', alt: 'Serene lake' },
          ];
          setMediaItems(initialSlides);
        }
      } catch (error) {
        console.error('Error loading media:', error);
      }
    };

    loadMedia();
  }, []);

  // Save media to storage when it changes
  useEffect(() => {
    const saveMedia = async () => {
      try {
        // Prepare media items for storage
        const itemsToSave = await Promise.all(
          mediaItems.map(async (item) => {
            // Don't save external URLs
            if (item.url.startsWith('http')) {
              return item;
            }
            
            // Save blob/data URLs to IndexedDB
            const storedUrl = await saveMediaToStorage(item.url);
            return { ...item, url: storedUrl };
          })
        );
        
        localStorage.setItem('mediaItems', JSON.stringify(itemsToSave));
      } catch (error) {
        console.error('Error saving media:', error);
      }
    };

    if (mediaItems.length > 0) {
      saveMedia();
    }
  }, [mediaItems]);

  // Carousel navigation functions
  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setTransitionDirection('left');
    const newIndex = currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, mediaItems.length]);

  const nextSlide = useCallback(() => {
    if (mediaItems.length <= 1) return;
    setTransitionDirection('right');
    const newIndex = currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, mediaItems.length]);

  const goToSlide = (slideIndex) => {
    setTransitionDirection(slideIndex > currentIndex ? 'right' : 'left');
    setCurrentIndex(slideIndex);
  };

  // Handle file uploads
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newItems = [...mediaItems];
    
    for (const file of files) {
      try {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          const url = URL.createObjectURL(file);
          newItems.push({
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url,
            alt: file.name,
            file // Keep file reference for potential re-upload
          });
        }
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
    
    setMediaItems(newItems);
    setCurrentIndex(newItems.length - 1);
  };

  // Delete media item
  const deleteItem = async (indexToDelete) => {
    if (mediaItems.length === 0) return;

    const item = mediaItems[indexToDelete];
    if (item.url.startsWith('blob:')) {
      URL.revokeObjectURL(item.url);
    }

    // Remove from IndexedDB if it was stored there
    if (item.url.startsWith('indexeddb:')) {
      try {
        const db = await initDB();
        const id = item.url.replace('indexeddb:', '');
        await db.delete('media', id);
      } catch (error) {
        console.error('Error deleting from IndexedDB:', error);
      }
    }

    const newItems = mediaItems.filter((_, index) => index !== indexToDelete);
    setMediaItems(newItems);
    
    if (currentIndex >= newItems.length) {
      setCurrentIndex(Math.max(0, newItems.length - 1));
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="bg-green-950 min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans text-gray-800 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-10 w-full">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Leaf className="text-green-600" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-lime-600">
              Our Planet in Focus
            </h1>
          </div>
          <p className="text-white text-lg mb-4">Documenting our conservation efforts across the globe.</p>
        </div>

        {/* Carousel Container */}
        <div className="h-[400px] md:h-[550px] w-full relative group" ref={carouselRef}>
          
          {/* Main Display Area */}
          <div className="w-full h-full rounded-2xl bg-black overflow-hidden shadow-2xl shadow-green-900/20 border-4 border-white relative">
            {mediaItems.length > 0 ? (
              mediaItems[currentIndex]?.type === 'video' ? (
                <video 
                  src={mediaItems[currentIndex].url} 
                  className="w-full h-full object-contain" 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                />
              ) : (
                <div className={`w-full h-full ${transitionDirection === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}`}>
                  <img 
                    src={mediaItems[currentIndex]?.url} 
                    alt={mediaItems[currentIndex]?.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            ) : (
              <div className="text-white text-center absolute inset-0 flex flex-col items-center justify-center">
                <p>No media to display.</p>
                <p className="text-sm text-gray-400">Click the upload icon to get started.</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
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
            aria-label="Add media"
            className="absolute top-4 right-16 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white cursor-pointer hover:bg-green-600/80 transition-all duration-300 z-30"
          >
            <Upload size={20} />
          </button>

          {/* Delete Button */}
          {mediaItems.length > 0 && (
            <button
              onClick={() => deleteItem(currentIndex)}
              aria-label="Delete media"
              className="hidden group-hover:flex absolute top-4 right-4 items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white cursor-pointer hover:bg-red-500/80 transition-all duration-300 z-20"
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
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-300 z-10"
              >
                <ChevronLeft size={30} />
              </button>
              <button 
                onClick={nextSlide} 
                aria-label="Next" 
                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-all duration-300 z-10"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}
          
          {/* Thumbnail Navigation */}
          {mediaItems.length > 1 && (
            <div className="absolute -bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%+4rem)] md:w-full">
              <div className="flex items-center justify-center gap-2 md:gap-4 p-4">
                {mediaItems.map((media, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ease-in-out border-2 shadow-md ${
                      currentIndex === index ? 'border-green-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-400'
                    }`}
                  >
                    {media.type === 'image' ? (
                      <img 
                        src={media.url} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-16 h-16 md:w-20 md:h-20 object-cover" 
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-800">
                        <Video size={32} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add these to your global CSS */}
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-in-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}