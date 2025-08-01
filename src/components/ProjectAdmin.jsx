import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Sliders,
  ImagePlus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// Default projects with placeholder image URLs instead of base64
const initialProjects = [
  {
    id: uuidv4(),
    title: "Tree Planting Initiative",
    status: "Ongoing",
    description: "Planting trees in rural schools",
    progress: 75,
    type: "forest",
    img: "/images/img1.webp",
    images: ["/images/img1.webp", "/images/img2.jpg"],
  },
  {
    id: uuidv4(),
    title: "Pond Restoration",
    status: "Completed",
    description: "Restoring local ponds",
    progress: 100,
    type: "water",
    img: "/images/img3.jpg",
    images: ["/images/img3.jpg", "/images/img1.webp"],
  },
];

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "Planned",
    progress: 0,
    type: "forest",
    img: "",
    images: [],
  });
  const [imageError, setImageError] = useState(false);

  // Load projects from localStorage on component mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        setProjects(initialProjects);
        localStorage.setItem("projects", JSON.stringify(initialProjects));
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects(initialProjects);
    }
  }, []);

  // Save projects to localStorage when they change
  useEffect(() => {
    try {
      if (projects.length > 0) {
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    } catch (error) {
      console.error("Error saving projects:", error);
      // Handle storage quota exceeded
      if (error.name === "QuotaExceededError") {
        alert(
          "Storage limit exceeded. Please reduce the number or size of images."
        );
      }
    }
  }, [projects]);

  const handleImageUpload = async (e, isMainImage = false) => {
    const files = Array.from(e.target.files);

    // ✅ Convert each selected image to Base64
    const base64Images = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    );

    if (selectedProject) {
      if (isMainImage) {
        setSelectedProject({
          ...selectedProject,
          img: base64Images[0] || selectedProject.img,
        });
      } else {
        setSelectedProject({
          ...selectedProject,
          images: [...selectedProject.images, ...base64Images],
        });
      }
    } else {
      if (isMainImage) {
        setNewProject({
          ...newProject,
          img: base64Images[0] || newProject.img,
        });
      } else {
        setNewProject({
          ...newProject,
          images: [...newProject.images, ...base64Images],
        });
      }
    }
  };

  const addProject = () => {
    if (!newProject.title || !newProject.img) return;

    const projectWithId = {
      ...newProject,
      id: uuidv4(),
      images:
        newProject.images.length > 0 ? newProject.images : [newProject.img],
    };

    setProjects([...projects, projectWithId]);
    setShowAddForm(false);
    setNewProject({
      title: "",
      description: "",
      status: "Planned",
      progress: 0,
      type: "forest",
      img: "",
      images: [],
    });
  };

  const updateProject = () => {
    if (!selectedProject) return;
    setProjects(
      projects.map((p) => (p.id === selectedProject.id ? selectedProject : p))
    );
    setSelectedProject(null);
  };

  const deleteProject = () => {
    if (!selectedProject) return;
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== selectedProject.id));
      setSelectedProject(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-lime-500">Projects Admin</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
          >
            <div className="h-48 overflow-hidden relative">
              {project.img ? (
                <img
                  src={project.img} // ✅ Removed `/images/`
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <h3 className="text-white font-bold">{project.title}</h3>
                <p className="text-gray-300 text-sm">
                  {project.status} - {project.progress}%
                </p>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this project?"
                    )
                  ) {
                    setProjects(projects.filter((p) => p.id !== project.id));
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-lg w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto hidden-scroll">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-lime-400">
                Add New Project
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Title*</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="w-full bg-[#2d3748] focus:ring-2 focus:ring-lime-400 text-white p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) =>
                    setNewProject({ ...newProject, status: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white p-2 rounded"
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Type</label>
                <select
                  value={newProject.type}
                  onChange={(e) =>
                    setNewProject({ ...newProject, type: e.target.value })
                  }
                  className="w-full bg-gray-700 text-white p-2 rounded"
                >
                  <option value="forest">Forest</option>
                  <option value="water">Water</option>
                  <option value="infra">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">
                  Progress: {newProject.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProject.progress}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      progress: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white p-2 rounded h-24"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Main Image*</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded p-4 cursor-pointer hover:border-gray-500">
                  {newProject.img ? (
                    <div className="h-32 flex items-center justify-center">
                      <img
                        src={newProject.img}
                        alt="Preview"
                        className="max-h-28 rounded shadow-md"
                      />
                    </div>
                  ) : (
                    <>
                      <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400">Click to upload</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">
                  Additional Images
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newProject.images.map((img, i) => (
                    <div key={i} className="relative bg-gray-700 p-2 rounded">
                      <img
                        src={img}
                        alt={`Preview ${i}`}
                        className="w-16 h-16 object-cover rounded shadow"
                      />

                      <button
                        onClick={() =>
                          setNewProject({
                            ...newProject,
                            images: newProject.images.filter(
                              (_, index) => index !== i
                            ),
                          })
                        }
                        className="absolute top-0 right-0 bg-lime-500 hover:bg-lime-600 text-black p-0.5 rounded-full transform translate-x-1 -translate-y-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded p-2 cursor-pointer hover:border-gray-500">
                  <ImagePlus className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-gray-400">Add more images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={addProject}
                  disabled={!newProject.title || !newProject.img}
                  className={`px-4 py-2 rounded ${
                    !newProject.title || !newProject.img
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-lime-400">Edit Project</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Title*</label>
                      <input
                        type="text"
                        value={selectedProject.title}
                        onChange={(e) =>
                          setSelectedProject({
                            ...selectedProject,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Status</label>
                      <select
                        value={selectedProject.status}
                        onChange={(e) =>
                          setSelectedProject({
                            ...selectedProject,
                            status: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Type</label>
                      <select
                        value={selectedProject.type}
                        onChange={(e) =>
                          setSelectedProject({
                            ...selectedProject,
                            type: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded"
                      >
                        <option value="forest">Forest</option>
                        <option value="water">Water</option>
                        <option value="infra">Infrastructure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">
                        Progress: {selectedProject.progress}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedProject.progress}
                        onChange={(e) =>
                          setSelectedProject({
                            ...selectedProject,
                            progress: parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={selectedProject.description}
                        onChange={(e) =>
                          setSelectedProject({
                            ...selectedProject,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 text-white p-2 rounded h-24"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Images</h3>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-1">
                      Main Image
                    </label>
                    <div className="relative">
                      {selectedProject.img ? (
                        <img
                          src={
                            selectedProject.img.startsWith("data:image")
                              ? selectedProject.img
                              : `/images/${selectedProject.img}`
                          }
                          alt="Main"
                          className="w-full h-48 object-contain bg-gray-700 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1 rounded cursor-pointer">
                        <ImagePlus className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">
                      Additional Images
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {selectedProject.images.map((img, i) => (
                        <div key={i} className="relative group">
                          {img ? (
                            <img
                              src={
                                img.startsWith("data:image")
                                  ? img
                                  : `/images/${img}`
                              }
                              alt=""
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-image.jpg";
                              }}
                            />
                          ) : (
                            <div className="w-full h-24 bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                          <button
                            onClick={() =>
                              setSelectedProject({
                                ...selectedProject,
                                images: selectedProject.images.filter(
                                  (_, index) => index !== i
                                ),
                              })
                            }
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded p-2 cursor-pointer hover:border-gray-500">
                      <ImagePlus className="w-5 h-5 mr-2 text-gray-400" />
                      <span className="text-gray-400">Add more images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex justify-between">
              <button
                onClick={deleteProject}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete Project
              </button>

              <div className="space-x-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProject}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAdmin;
