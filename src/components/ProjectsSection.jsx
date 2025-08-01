import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const ProjectImage = ({ src, alt, className }) => (
  <div className={`${className} bg-gray-700 flex items-center justify-center`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-gray-400">Image not available</span>
    )}
  </div>
);

const ImagePopup = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-lg w-full max-w-5xl max-h-[95vh] overflow-hidden transition-all duration-300 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <h3 className="text-xl font-bold text-lime-300">{project.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image Display */}
        <div className="relative bg-black flex items-center justify-center h-[500px]">
          {project.images?.length > 0 ? (
            <>
              <img
                src={project.images[currentImageIndex]}
                alt={`Project ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-opacity-100 bg-opacity-70 text-white p-3 rounded-full"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-opacity-100  bg-opacity-70 text-white p-3 rounded-full"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-gray-400">No images available</div>
          )}
        </div>

        {/* Thumbnails */}
        {project.images?.length > 1 && (
          <div className="flex gap-2 justify-center items-center p-3 bg-neutral-800 border-t border-neutral-700">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-14 rounded-md overflow-hidden border-2 ${
                  currentImageIndex === idx
                    ? "border-lime-400"
                    : "border-transparent"
                } transition-all duration-200`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const typeColors = {
  forest: "bg-green-500",
  water: "bg-blue-500",
  infra: "bg-yellow-500",
};

const AllProjectsPopup = ({ projects = [], onClose, onProjectClick }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-neutral-900 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-neutral-700">
        <h3 className="text-2xl font-bold text-lime-300">All Projects</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-5 overflow-y-auto ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
            onClick={() => onProjectClick(project)}
          >
            <div className="h-48 overflow-hidden">
              <ProjectImage
                src={project.img || "/fallback.jpg"} // Fallback in case of broken src
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-grow  bg-white/10 backdrop-blur-md rounded-b-md">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lime-300">{project.title}</h3>

                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300 h-fit">
                    {project.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2 min-h-[2.5em]">
                {project.description}
              </p>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs font-medium text-white">
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      typeColors[project.type] || "bg-gray-500"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Define colors for different project types
  const typeColors = {
    forest: "bg-green-500",
    water: "bg-blue-500",
    infra: "bg-yellow-500",
  };

  const defaultProjects = [
    {
      id: uuidv4(),
      title: "Tree Planting Initiative",
      status: "Ongoing",
      tag: "Collaboration with ONGC",
      description:
        "We've successfully planted 1,000 trees in rural schools, creating green spaces for students and improving local air quality.",
      progress: 75,
      type: "forest",
      img: "/images/img1.webp",
      images: ["/images/img1.webp", "/images/img2.jpg"],
    },
    {
      id: uuidv4(),
      title: "Pond Restoration",
      status: "Completed",
      tag: "Community Project",
      description:
        "We've successfully restored a local pond, improving water quality and creating a thriving ecosystem for local wildlife and communities.",
      progress: 100,
      type: "water",
      img: "/images/img3.jpg",
      images: ["/images/img3.jpg", "/images/img1.webp"],
    },
    {
      id: uuidv4(),
      title: "Solar Panel Installation",
      status: "Planned",
      tag: "Sustainable Energy",
      description:
        "Installing solar panels in remote schools to reduce energy costs and promote clean energy use.",
      progress: 35,
      type: "infra",
      img: "/images/img4.avif",
      images: ["/images/img4.avif", "/images/img2.jpg"],
    },
  ];

  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        setProjects(parsed.length > 0 ? parsed : defaultProjects);
      } else {
        localStorage.setItem("projects", JSON.stringify(defaultProjects));
        setProjects(defaultProjects);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjects(defaultProjects);
    }
  }, []);

  const visibleProjects = projects.slice(startIndex, startIndex + 3);

  const nextProjects = () => {
    setStartIndex((prev) => (prev + 1) % Math.max(1, projects.length - 2));
  };

  const prevProjects = () => {
    setStartIndex(
      (prev) => (prev - 1 + projects.length) % Math.max(1, projects.length - 2)
    );
  };

  return (
    <section id="projects" className="px-4 sm:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-300 text-center">
            Our Projects
          </h2>
          <p className="text-gray-300 mt-2 max-w-xl mx-auto text-center">
            Discover our ongoing initiatives to restore and protect our
            environment through sustainable practices and community engagement.
          </p>
          <div className="h-1 w-24 bg-lime-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative">
          <button
            onClick={prevProjects}
            disabled={projects.length <= 3}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                className="bg-green-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-full h-48 overflow-hidden">
                  <ProjectImage
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-sm flex-grow flex flex-col justify-between min-h-[150px]">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-lime-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-xs">{project.tag}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-xl text-xs font-medium bg-green-900 text-green-100 h-fit">
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm  line-clamp-2 min-h-[2.5em]">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-white">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          typeColors[project.type] || "bg-gray-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextProjects}
            disabled={projects.length <= 3}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-green-700 hover:bg-green-600 p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>
        </div>

        <div className="text-right mt-6 mr-10">
          <button
            onClick={() => setShowAllProjects(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Projects
          </button>
        </div>

        {selectedProject && (
          <ImagePopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {showAllProjects && (
          <AllProjectsPopup
            projects={projects}
            onClose={() => setShowAllProjects(false)}
            onProjectClick={(project) => {
              setShowAllProjects(false);
              setSelectedProject(project);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
