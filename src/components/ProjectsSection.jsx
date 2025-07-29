import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  ImagePlus,
  Plus,
  Sliders,
  Grid,
} from "lucide-react";
import { openDB } from 'idb';

const typeColors = {
  forest: "bg-lime-400",
  water: "bg-blue-400",
  infra: "bg-cyan-400",
};

const initialProjects = [
  {
    title: "Tree Planting Initiative",
    status: "Ongoing",
    tag: "Collaboration with ONGC",
    description:
      "We've successfully planted 1,000 trees in rural schools, creating green spaces for students and improving local air quality.",
    progress: 75,
    type: "forest",
    img: "/images/img1.webp",
    bgColor: "bg-green-800",
    images: [
      "/images/img1.webp",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.avif",
    ],
  },
  {
    title: "Pond Restoration",
    status: "Completed",
    tag: "Community Project",
    description:
      "We've successfully restored a local pond, improving water quality and creating a thriving ecosystem for local wildlife and communities.",
    progress: 100,
    type: "water",
    img: "/images/img3.jpg",
    bgColor: "bg-green-800",
    images: ["/images/img3.jpg", "/images/img1.webp"],
  },
  {
    title: "Water Tank Construction",
    status: "In Progress",
    tag: "ONGC CSR Project",
    description:
      "Building a water tank to provide clean water access to rural communities, improving health and sanitation for hundreds of families.",
    progress: 60,
    type: "infra",
    img: "/images/img2.jpg",
    bgColor: "bg-green-800",
    images: ["/images/img2.jpg", "/images/img4.avif"],
  },
  {
    title: "Solar Panel Installation",
    status: "Planned",
    tag: "Sustainable Energy",
    description:
      "Installing solar panels in remote schools to reduce energy costs and promote clean energy use.",
    progress: 35,
    type: "infra",
    img: "/images/img4.avif",
    bgColor: "bg-green-800",
    images: ["/images/img4.avif", "/images/img2.jpg"],
  },
];

const timeline = [
  {
    title: "Project Initiation",
    description: "Partnership agreement with ONGC for CSR funding",
    date: "January 2023",
    color: "text-green-400",
  },
  {
    title: "Tree Planting Phase",
    description: "1,000 trees planted across 10 rural schools",
    date: "March–May 2023",
    color: "text-lime-300",
  },
  {
    title: "Pond Restoration",
    description: "Complete restoration of community pond",
    date: "June–August 2023",
    color: "text-blue-400",
  },
  {
    title: "Water Tank Construction",
    description: "Building water storage and filtration system",
    date: "September 2023 – Present",
    color: "text-cyan-300",
  },
  {
    title: "Project Completion",
    description: "Final evaluation and community handover",
    date: "Expected March 2024",
    color: "text-purple-300",
  },
];

// Image Storage Utilities
const saveImageToStorage = async (imageData) => {
  if (!imageData.startsWith('data:image')) {
    return imageData; // Already a URL, no need to store
  }

  try {
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

const getImageFromStorage = async (imageRef) => {
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

// Project Image Component
const ProjectImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const img = src.startsWith('indexeddb:') 
          ? await getImageFromStorage(src)
          : src;
        setImageSrc(img || '');
      } catch (error) {
        console.error("Error loading image:", error);
        setImageSrc('');
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, [src]);

  if (loading) {
    return (
      <div className={`bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Loading image...</span>
      </div>
    );
  }

  return imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} />
  ) : (
    <div className={`bg-gray-700 flex items-center justify-center ${className}`}>
      <span className="text-gray-400">Image not available</span>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg my-4">
          <h3 className="font-bold">Something went wrong with project storage</h3>
          <p>Try refreshing the page or clearing your browser data</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const ImagePopup = ({
  project,
  onClose,
  onDeleteImages,
  onAddImages,
  onUpdateProject,
  onDeleteProject,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleImageSelection = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleDelete = () => {
    onDeleteImages(selectedImages);
    setSelectedImages([]);
    if (currentImageIndex >= project.images.length - selectedImages.length) {
      setCurrentImageIndex(0);
    }
  };

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = await Promise.all(
      files.map(async (file) => {
        const imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
        return await saveImageToStorage(imageUrl);
      })
    );
    onAddImages(newImageUrls);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setEditedProject({ ...editedProject, progress: newProgress });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value });
  };

  const saveChanges = () => {
    onUpdateProject(editedProject);
    setEditMode(false);
  };

  const confirmDeleteProject = () => {
    onDeleteProject();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full h-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-lime-300">
            {editMode ? (
              <input
                type="text"
                name="title"
                value={editedProject.title}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-1 rounded"
              />
            ) : (
              project.title
            )}
          </h3>
          <div className="flex items-center space-x-2">
            {!editMode && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Project
              </button>
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Sliders className="w-4 h-4 mr-1" />
              {editMode ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="p-4 bg-gray-700 border-b border-gray-600">
            <div className="flex flex-col items-center">
              <p className="text-white mb-4">
                Are you sure you want to delete this project?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProject}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {editMode && (
          <div className="p-4 bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editedProject.status}
                  onChange={handleInputChange}
                  className="bg-gray-600 text-white p-2 rounded w-full"
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={editedProject.tag}
                  onChange={handleInputChange}
                  className="bg-gray-600 text-white p-2 rounded w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedProject.description}
                  onChange={handleInputChange}
                  className="bg-gray-600 text-white p-2 rounded w-full h-24"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">
                  Progress: {editedProject.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editedProject.progress}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editedProject.type}
                  onChange={handleInputChange}
                  className="bg-gray-600 text-white p-2 rounded w-full"
                  placeholder="e.g., forest, water, infra"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center p-4 bg-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              disabled={selectedImages.length === 0}
              className={`flex items-center px-4 py-2 rounded-md ${
                selectedImages.length === 0
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Selected
            </button>
          </div>
          <div>
            <label className="flex items-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white cursor-pointer">
              <ImagePlus className="w-5 h-5 mr-2" />
              Add Images
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImages}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div className="flex-grow relative bg-black flex items-center justify-center">
            {project.images.length > 0 ? (
              <>
                <ProjectImage
                  src={project.images[currentImageIndex]}
                  alt={`Project ${currentImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out"
                />
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
                  Image {currentImageIndex + 1} of {project.images.length}
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-lg">No images available</div>
            )}
          </div>

          <div className="w-full md:w-48 bg-gray-900 overflow-y-auto p-2 flex md:flex-col flex-row">
            {project.images.map((image, index) => (
              <div
                key={index}
                className={`relative m-1 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  currentImageIndex === index
                    ? "border-lime-400"
                    : "border-transparent"
                } ${
                  selectedImages.includes(image)
                    ? "opacity-70 ring-2 ring-blue-400"
                    : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleImageSelection(image);
                  }}
                  className="absolute top-1 left-1 w-5 h-5 cursor-pointer z-10"
                />
                <ProjectImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-24 object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProjectPopup = ({ onClose, onAddProject }) => {
  const [newProject, setNewProject] = useState({
    title: "",
    status: "Planned",
    tag: "",
    description: "",
    progress: 0,
    type: "",
    img: "",
    bgColor: "bg-green-800",
    images: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    setNewProject({ ...newProject, progress });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = event.target.result;
        const storedImageRef = await saveImageToStorage(imageData);
        setNewProject({
          ...newProject,
          img: storedImageRef,
          images: [storedImageRef],
        });
        // Show the actual image for preview
        setSelectedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (newProject.title && newProject.img) {
      onAddProject(newProject);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-lime-300">Add New Project</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={newProject.title}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full transition-colors duration-200 focus:ring-2 focus:ring-lime-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full transition-colors duration-200 focus:ring-2 focus:ring-lime-400"
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={newProject.tag}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full transition-colors duration-200 focus:ring-2 focus:ring-lime-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={newProject.type}
                  onChange={handleInputChange}
                  className="bg-gray-700 text-white p-2 rounded w-full transition-colors duration-200 focus:ring-2 focus:ring-lime-400"
                  placeholder="e.g., forest, water, infra"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Poster Image*
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 cursor-pointer hover:border-gray-500 transition-colors duration-200">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="h-32 object-contain mb-2 transition-transform duration-200 hover:scale-105"
                    />
                  ) : (
                    <>
                      <ImagePlus className="w-10 h-10 text-gray-400 mb-2 transition-transform duration-200 hover:scale-110" />
                      <span className="text-gray-400 text-sm">
                        Click to upload poster image
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">
                  Progress: {newProject.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProject.progress}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-300 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded w-full h-32 transition-colors duration-200 focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!newProject.title || !newProject.img}
              className={`px-4 py-2 rounded transition-all duration-200 ${
                !newProject.title || !newProject.img
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllProjectsPopup = ({ projects, onClose, onProjectClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-lime-300">All Projects</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`rounded-xl shadow-md overflow-hidden flex flex-col ${p.bgColor} transition-all duration-300 hover:scale-105 cursor-pointer`}
                onClick={() => onProjectClick(p)}
              >
                <div className="w-full h-48 overflow-hidden">
                  <ProjectImage
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5 text-sm flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-700 px-2 py-0.5 rounded-full text-xs font-semibold uppercase">
                        {p.status}
                      </span>
                      <span className="text-gray-300 text-xs">{p.tag}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{p.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Progress</span>
                      <span className="text-white font-medium">
                        {p.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          typeColors[p.type] || 'bg-gray-500'
                        } transition-all duration-700 ease-in-out`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const visible = 3;
  const [start, setStart] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectsData, setProjectsData] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('projectsData');
      return savedProjects ? JSON.parse(savedProjects) : initialProjects;
    } catch (error) {
      console.error("Error loading projects from localStorage:", error);
      return initialProjects;
    }
  });
  const [showAllProjectsPopup, setShowAllProjectsPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [storageError, setStorageError] = useState(null);

  useEffect(() => {
    const saveProjectsData = async () => {
      try {
        // Only save text data to localStorage, not images
        const projectsToSave = projectsData.map(project => ({
          ...project,
          // Don't save base64 images to localStorage
          img: project.img.startsWith('data:image') ? '' : project.img,
          images: project.images.map(img => 
            img.startsWith('data:image') ? '' : img
          )
        }));
        localStorage.setItem('projectsData', JSON.stringify(projectsToSave));
      } catch (error) {
        console.error("Error saving projects to localStorage:", error);
        setStorageError("Failed to save projects. Your changes might not persist.");
        setTimeout(() => setStorageError(null), 5000);
      }
    };

    saveProjectsData();
  }, [projectsData]);

  const animateScroll = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const transitionTime = 300;
    
    if (direction === 'next') {
      setStart((s) => (s + 1) % projectsData.length);
    } else {
      setStart((s) => (s - 1 + projectsData.length) % projectsData.length);
    }

    setTimeout(() => setIsAnimating(false), transitionTime);
  };

  const next = () => animateScroll('next');
  const prev = () => animateScroll('prev');

  const getVisibleProjects = () => {
    const result = [];
    for (let i = 0; i < visible; i++) {
      result.push(projectsData[(start + i) % projectsData.length]);
    }
    return result;
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  const handleDeleteImages = (imagesToDelete) => {
    if (!selectedProject) return;
    
    setProjectsData((prev) =>
      prev.map((project) =>
        project.title === selectedProject.title
          ? {
              ...project,
              images: project.images.filter(
                (image) => !imagesToDelete.includes(image)
              ),
            }
          : project
      )
    );
  };

  const handleAddImages = async (newImages) => {
    if (!selectedProject) return;
    
    const storedImages = await Promise.all(
      newImages.map(async (img) => {
        if (img.startsWith('data:image')) {
          return await saveImageToStorage(img);
        }
        return img;
      })
    );
    
    setProjectsData((prev) =>
      prev.map((project) =>
        project.title === selectedProject.title
          ? {
              ...project,
              images: [...project.images, ...storedImages],
            }
          : project
      )
    );
  };

  const handleUpdateProject = (updatedProject) => {
    setProjectsData((prev) =>
      prev.map((project) =>
        project.title === selectedProject.title
          ? { ...updatedProject }
          : project
      )
    );
    setSelectedProject(updatedProject);
  };

  const handleAddProject = async (newProject) => {
    // Store images in IndexedDB
    const storedImg = await saveImageToStorage(newProject.img);
    const storedImages = await Promise.all(
      newProject.images.map(img => saveImageToStorage(img))
    );
    
    setProjectsData((prev) => [
      ...prev,
      {
        ...newProject,
        img: storedImg,
        images: storedImages
      }
    ]);
    setShowAddProject(false);
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    setProjectsData((prev) =>
      prev.filter((project) => project.title !== selectedProject.title)
    );
    setSelectedProject(null);
  };

  return (
    <section className="text-white px-4 sm:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowAllProjectsPopup(true)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <Grid className="w-5 h-5 mr-1" />
              View All Projects
            </button>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-lime-300">
                Our Projects
              </h2>
              <p className="text-gray-300 mt-2 max-w-xl mx-auto">
                Discover our ongoing initiatives to restore and protect our
                environment through sustainable practices and community
                engagement.
              </p>
            </div>
            <button
              onClick={() => setShowAddProject(true)}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Project
            </button>
          </div>
          <div className="h-1 w-24 bg-lime-400 mx-auto mt-4 rounded-full" />
        </div>

        {storageError && (
          <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-center">
            {storageError}
          </div>
        )}

        <div className="relative mb-16">
          <button
            onClick={prev}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="text-white w-5 h-5" />
          </button>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 transition-opacity duration-300 ${isAnimating ? 'opacity-70' : 'opacity-100'}`}>
            {getVisibleProjects().map((p, i) => (
              <div
                key={i}
                className={`rounded-xl shadow-md overflow-hidden flex flex-col ${p.bgColor} transition-all duration-300 ease-out hover:scale-105 cursor-pointer`}
                onClick={() => handleProjectClick(p)}
              >
                <div className="w-full h-48 overflow-hidden">
                  <ProjectImage
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />
                </div>
                <div className="p-5 text-sm flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-green-700 px-2 py-0.5 rounded-full text-xs font-semibold uppercase">
                        {p.status}
                      </span>
                      <span className="text-gray-300 text-xs">{p.tag}</span>
                    </div>
                    <p className="text-gray-200 mb-4">{p.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Progress</span>
                      <span className="text-white font-medium">
                        {p.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          typeColors[p.type] || 'bg-gray-500'
                        } transition-all duration-500 ease-out`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="text-white w-5 h-5" />
          </button>
        </div>

        <ErrorBoundary>
          {selectedProject && (
            <ImagePopup
              project={selectedProject}
              onClose={handleClosePopup}
              onDeleteImages={handleDeleteImages}
              onAddImages={handleAddImages}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {showAddProject && (
            <AddProjectPopup
              onClose={() => setShowAddProject(false)}
              onAddProject={handleAddProject}
            />
          )}

          {showAllProjectsPopup && (
            <AllProjectsPopup
              projects={projectsData}
              onClose={() => setShowAllProjectsPopup(false)}
              onProjectClick={(project) => {
                setShowAllProjectsPopup(false);
                setSelectedProject(project);
              }}
            />
          )}
        </ErrorBoundary>

        
      </div>
    </section>
  );
};

export default ProjectsSection;